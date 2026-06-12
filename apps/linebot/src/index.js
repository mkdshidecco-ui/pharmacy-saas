require('dotenv').config();
const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const { middleware, messagingApi } = require('@line/bot-sdk');
const { handleStockMessage } = require('./lib/stock');
const { handleCalendarMessage } = require('./lib/calendar');
const { isWhitelisted, addToWhitelist, removeFromWhitelist, ensureWhitelistTable } = require('./lib/whitelist');
const { registerScheduler, unregisterScheduler, initScheduler } = require('./lib/scheduler');

const app = express();
const PORT = process.env.PORT || 3005;
const dataRoot = process.env.DATA_ROOT || '/data';

// ログインID・パスワード（.env で設定）
const LOGIN_ID = process.env.LINEBOT_LOGIN_ID || 'staff';
const LOGIN_PASSWORD = process.env.LINEBOT_PASSWORD || 'changeme';

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

// 認証セッション管理（メモリ内）
// Map<`${tenantId}:${lineUserId}`, { step: 'awaiting_password', loginId: string, expireAt: number }>
const authSessions = new Map();

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

// テナントDBを取得する
function getTenantDb(tenantId) {
  const dbPath = path.join(dataRoot, 'tenants', tenantId, 'dev.db');
  const db = new Database(dbPath, { fileMustExist: false });
  // ホワイトリストテーブルを確実に作成
  ensureWhitelistTable(db);
  return db;
}

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  try {
    if (!systemDb) throw new Error('System DB is not connected');
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

  const lineConfig = {
    channelSecret: tenant.lineChannelSecret,
    channelAccessToken: tenant.lineChannelAccessToken
  };

  const lineMiddleware = middleware(lineConfig);

  lineMiddleware(req, res, (err) => {
    if (err) {
      console.error(`[LINE BOT ERROR] Signature validation failed for tenant: ${tenant.slug}`, err);
      return res.status(401).send('Signature validation failed');
    }

    const client = new messagingApi.MessagingApiClient({
      channelAccessToken: tenant.lineChannelAccessToken
    });

    Promise.all(req.body.events.map(event => handleEvent(event, tenant, client)))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(`[LINE BOT ERROR] Error handling events for tenant ${tenant.slug}:`, err);
        res.status(200).json({ success: false, error: err.message });
      });
  });
});

// 送信再試行機能
async function replyMessageWithRetry(client, replyToken, replyMessage, retries = 2) {
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      await client.replyMessage({
        replyToken: replyToken,
        messages: [replyMessage]
      });
      return;
    } catch (error) {
      console.error(`[LINE BOT ERROR] Attempt ${attempt} failed to send reply:`, error);
      if (attempt > retries) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// LINEイベントハンドラ
async function handleEvent(event, tenant, client) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  const lineUserId = event.source.userId;
  const userText = event.message.text.trim();
  const sessionKey = `${tenant.id}:${lineUserId}`;
  let replyMessage = null;

  try {
    const tenantDb = getTenantDb(tenant.id);

    // ===== 認証セッション処理（パスワード入力待ち） =====
    const session = authSessions.get(sessionKey);
    if (session && session.step === 'awaiting_password') {
      // セッションの有効期限チェック（60秒）
      if (Date.now() > session.expireAt) {
        authSessions.delete(sessionKey);
        replyMessage = { type: 'text', text: '⏰ タイムアウトしました。もう一度ログインIDから送信してください。' };
      } else if (userText === LOGIN_PASSWORD) {
        // 正しいパスワード → ホワイトリストに追加
        addToWhitelist(tenantDb, lineUserId);
        authSessions.delete(sessionKey);
        replyMessage = {
          type: 'text',
          text: `✅ 登録が完了しました！\nこれより「${tenant.displayName}」のBot機能がご利用いただけます。`
        };
      } else {
        // 間違ったパスワード
        authSessions.delete(sessionKey);
        replyMessage = { type: 'text', text: '❌ パスワードが正しくありません。管理者にご確認ください。' };
      }
      await replyMessageWithRetry(client, event.replyToken, replyMessage);
      return;
    }

    // ===== ログインIDコマンド（認証フロー開始） =====
    if (userText === LOGIN_ID) {
      if (isWhitelisted(tenantDb, lineUserId)) {
        replyMessage = { type: 'text', text: '✅ すでに登録済みです。引き続きBot機能をご利用ください。' };
      } else {
        // パスワード入力待ちセッションを開始（60秒）
        authSessions.set(sessionKey, {
          step: 'awaiting_password',
          expireAt: Date.now() + 60000
        });
        replyMessage = { type: 'text', text: 'パスワードを入力してください。\n（60秒以内に送信してください）' };
      }
      await replyMessageWithRetry(client, event.replyToken, replyMessage);
      return;
    }

    // ===== 退社コマンド =====
    if (userText === '退社') {
      const removed = removeFromWhitelist(tenantDb, lineUserId);
      if (removed) {
        replyMessage = { type: 'text', text: '👋 退社手続きが完了しました。お疲れ様でした。\nご利用ありがとうございました。' };
      } else {
        replyMessage = { type: 'text', text: 'ご登録情報が見つかりませんでした。' };
      }
      await replyMessageWithRetry(client, event.replyToken, replyMessage);
      return;
    }

    // ===== 定期送信開始コマンド =====
    if (userText === '定期送信開始') {
      const registered = registerScheduler(tenantDb, lineUserId);
      if (registered) {
        replyMessage = { type: 'text', text: '📢 毎朝8時（日・祝除く）の来店予定（未来店）通知を開始しました。' };
      } else {
        replyMessage = { type: 'text', text: '定期送信の登録に失敗しました。' };
      }
      await replyMessageWithRetry(client, event.replyToken, replyMessage);
      return;
    }

    // ===== 定期送信終了コマンド =====
    if (userText === '定期送信終了') {
      const unregistered = unregisterScheduler(tenantDb, lineUserId);
      if (unregistered) {
        replyMessage = { type: 'text', text: '🔇 定期送信を終了しました。' };
      } else {
        replyMessage = { type: 'text', text: '定期送信は登録されていないか、解除に失敗しました。' };
      }
      await replyMessageWithRetry(client, event.replyToken, replyMessage);
      return;
    }

    // ===== ホワイトリストチェック =====
    if (!isWhitelisted(tenantDb, lineUserId)) {
      replyMessage = { type: 'text', text: '🔒 管理者に使用方法を確認してください。' };
      await replyMessageWithRetry(client, event.replyToken, replyMessage);
      return;
    }

    // ===== 通常のBotコマンド処理 =====
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
        const helpText = `メッセージを受信しました: 「${userText}」\n\n【利用可能なコマンド】\n・「こんにちは」 (疎通確認)\n・「欠品」または「欠品リスト」\n・「欠品登録 [商品名]」\n・「欠品解消 [商品名]」\n・「不動在庫」 (半年先まで使用予定のない在庫)\n・「来局」または「来局予定」\n・「来局登録 [名前] [周期(日)]」\n・「来局周期変更 [名前] [新周期(日)]」\n・「来局削除 [名前]」\n・「定期送信開始」 (毎朝8時の予定通知開始)\n・「定期送信終了」 (通知解除)\n・「退社」 (退社時のアカウント削除)`;
        replyMessage = { type: 'text', text: helpText };
      }
    }

    await replyMessageWithRetry(client, event.replyToken, replyMessage);

  } catch (error) {
    console.error(`[LINE BOT ERROR] Event handling failure for tenant ${tenant.slug}:`, error);
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
  console.log(`[認証] ログインID: ${LOGIN_ID} でユーザー自己登録が有効`);
  
  if (systemDb) {
    initScheduler(systemDb, dataRoot);
  } else {
    console.warn('[Scheduler Warning] System DB is not connected. Scheduler is disabled.');
  }
});
