require('dotenv').config();
const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const { middleware, messagingApi } = require('@line/bot-sdk');
const { handleStockMessage } = require('./lib/stock');
const { handleCalendarMessage } = require('./lib/calendar');

const app = express();
const PORT = process.env.PORT || 3005;
const dataRoot = process.env.DATA_ROOT || '/data';

// System DB 接続
const systemDbPath = process.env.SYSTEM_DATABASE_URL 
  ? process.env.SYSTEM_DATABASE_URL.replace('file:', '') 
  : path.join(dataRoot, 'system', 'tenants.db');

console.log(`[起動] System DB パス: ${systemDbPath}`);

let systemDb;
try {
  systemDb = new Database(systemDbPath, { fileMustExist: false });
} catch (err) {
  console.error('[LINE BOT ERROR] Failed to connect to System DB:', err);
}

// テナント解決関数
function resolveTenant(tenantId) {
  if (!systemDb) return null;
  try {
    const stmt = systemDb.prepare(`
      SELECT * FROM "Tenant" 
      WHERE (id = ? OR slug = ?) AND isActive = 1
    `);
    return stmt.get(tenantId, tenantId);
  } catch (err) {
    console.error(`[LINE BOT ERROR] Failed to resolve tenant ${tenantId}:`, err);
    return null;
  }
}

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  try {
    if (!systemDb) throw new Error('System DB is not connected');
    // 簡単なクエリ疎通テスト
    systemDb.prepare('SELECT 1').get();
    res.json({ status: 'healthy', systemDb: 'connected' });
  } catch (err) {
    console.error('[LINE BOT HEALTH CHECK ERROR]:', err);
    res.status(500).json({ status: 'unhealthy', error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('PharmaSaaS LINE Bot Gateway is running.');
});

// LINE Webhook Endpoint (マルチテナント動的ルーティング)
app.post('/webhook/:tenantId', async (req, res, next) => {
  const { tenantId } = req.params;
  const tenant = resolveTenant(tenantId);

  if (!tenant) {
    console.warn(`[Webhook Warning] Tenant ${tenantId} not found or inactive.`);
    return res.status(404).send('Tenant not found');
  }

  if (!tenant.lineChannelSecret || !tenant.lineChannelAccessToken) {
    console.warn(`[Webhook Warning] Tenant ${tenant.slug} has no LINE Configuration.`);
    return res.status(400).send('LINE not configured');
  }

  // LINE署名検証用ミドルウェアの動的生成
  const lineConfig = {
    channelSecret: tenant.lineChannelSecret,
    channelAccessToken: tenant.lineChannelAccessToken
  };

  const lineMiddleware = middleware(lineConfig);

  // 署名検証ミドルウェアを実行
  lineMiddleware(req, res, (err) => {
    if (err) {
      console.error(`[LINE BOT ERROR] Signature validation failed for tenant: ${tenant.slug}`, err);
      return res.status(401).send('Signature validation failed');
    }

    const client = new messagingApi.MessagingApiClient({
      channelAccessToken: tenant.lineChannelAccessToken
    });

    // イベント非同期処理開始（LINE側を待たせないように200をすぐ返すためのハンドリング）
    Promise.all(req.body.events.map(event => handleEvent(event, tenant, client)))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(`[LINE BOT ERROR] Error handling events for tenant ${tenant.slug}:`, err);
        // LINE側の一時エラーによるWebhook停止を防ぐため、エラー時も200 OKを返しつつ内部エラーログを出力
        res.status(200).json({ success: false, error: err.message });
      });
  });
});

// 送信再試行機能（堅牢性の向上）
async function replyMessageWithRetry(client, replyToken, replyMessage, retries = 2) {
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      await client.replyMessage({
        replyToken: replyToken,
        messages: [replyMessage]
      });
      return; // 成功したら抜ける
    } catch (error) {
      console.error(`[LINE BOT ERROR] Attempt ${attempt} failed to send reply:`, error);
      if (attempt > retries) {
        throw error; // リトライ上限を超えたらエラーを投げる
      }
      // 少し待ってから再試行
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// LINEイベントハンドラ
async function handleEvent(event, tenant, client) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  const userText = event.message.text.trim();
  let replyMessage = null;

  try {
    // 1. 在庫管理キーワードの処理
    const stockResponse = await handleStockMessage(userText, tenant.id);
    if (stockResponse) {
      replyMessage = typeof stockResponse === 'object' ? stockResponse : { type: 'text', text: stockResponse };
    } 
    // 2. 来店予定キーワードの処理
    else {
      const calendarResponse = await handleCalendarMessage(userText, tenant.id);
      if (calendarResponse) {
        replyMessage = typeof calendarResponse === 'object' ? calendarResponse : { type: 'text', text: calendarResponse };
      } 
      // 3. 通信テスト・ヘルプ
      else if (userText === 'こんにちは') {
        replyMessage = { type: 'text', text: `こんにちは！こちらは「${tenant.displayName}」のLINE窓口です。通信疎通確認に成功しました。` };
      } else {
        const helpText = `メッセージを受信しました: 「${userText}」\n\n【利用可能なコマンド】\n・「こんにちは」 (疎通確認)\n・「欠品」または「欠品リスト」\n・「欠品登録 [商品名]」\n・「欠品解消 [商品名]」\n・「不動在庫」 (半年先まで使用予定のない在庫)\n・「来局」または「来局予定」\n・「来局登録 [名前] [周期(日)]」\n・「来局周期変更 [名前] [新周期(日)]」\n・「来局削除 [名前]」`;
        replyMessage = { type: 'text', text: helpText };
      }
    }

    // メッセージ返信（リトライ付き）
    await replyMessageWithRetry(client, event.replyToken, replyMessage);

  } catch (error) {
    console.error(`[LINE BOT ERROR] Event handling failure for tenant ${tenant.slug}:`, error);
    // エラーが起きたことをユーザーにもテキストで通知（親切設計）
    try {
      await client.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: 'text', text: '申し訳ありません。システムエラーが発生したため、メッセージを処理できませんでした。時間をおいてもう一度お試しください。' }]
      });
    } catch (sendErr) {
      console.error('[LINE BOT ERROR] Failed to send fallback error message:', sendErr);
    }
    throw error;
  }
}

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error('[LINE BOT ERROR] Unhandled server error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`LINE Bot server is running on port ${PORT}`);
});
