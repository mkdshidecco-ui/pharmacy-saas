'use strict';
const cron = require('node-cron');
const { isHoliday } = require('japanese-holidays');
const { messagingApi } = require('@line/bot-sdk');
const path = require('path');
const Database = require('better-sqlite3');
const fs = require('fs');

/**
 * テナントDBの LineScheduleConfig テーブルが存在しない場合に作成する
 * @param {import('better-sqlite3').Database} db テナントDB
 */
function ensureScheduleTable(db) {
  try {
    db.prepare(`
      CREATE TABLE IF NOT EXISTS LineScheduleConfig (
        id         TEXT PRIMARY KEY,
        lineUserId TEXT UNIQUE NOT NULL,
        isActive   INTEGER NOT NULL DEFAULT 1,
        createdAt  TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt  TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `).run();
  } catch (err) {
    console.error('[Scheduler] ensureScheduleTable error:', err);
  }
}

/**
 * 定期送信を開始（登録）する
 * @param {import('better-sqlite3').Database} db テナントDB
 * @param {string} lineUserId LINE userId
 * @returns {boolean} 成功かどうか
 */
function registerScheduler(db, lineUserId) {
  try {
    ensureScheduleTable(db);
    db.prepare(`
      INSERT INTO LineScheduleConfig (id, lineUserId, isActive, createdAt, updatedAt)
      VALUES (lower(hex(randomblob(16))), ?, 1, datetime('now'), datetime('now'))
      ON CONFLICT(lineUserId) DO UPDATE SET isActive = 1, updatedAt = datetime('now')
    `).run(lineUserId);
    return true;
  } catch (err) {
    console.error('[Scheduler] registerScheduler error:', err);
    return false;
  }
}

/**
 * 定期送信を終了（解除）する
 * @param {import('better-sqlite3').Database} db テナントDB
 * @param {string} lineUserId LINE userId
 * @returns {boolean} 成功かどうか
 */
function unregisterScheduler(db, lineUserId) {
  try {
    ensureScheduleTable(db);
    const result = db.prepare(`
      UPDATE LineScheduleConfig
      SET isActive = 0, updatedAt = datetime('now')
      WHERE lineUserId = ?
    `).run(lineUserId);
    return result.changes > 0;
  } catch (err) {
    console.error('[Scheduler] unregisterScheduler error:', err);
    return false;
  }
}

/**
 * 昨日までに来局予定だったが、まだ来局実績がない（未完了の）顧客リストを取得する
 * @param {import('better-sqlite3').Database} db テナントDB
 * @returns {string[]} 未完了の顧客の名前リスト
 */
function getOverdueUnvisitedCustomers(db) {
  // 日本時間の今日の日付文字列 (YYYY-MM-DD) を取得
  const now = new Date();
  const jstString = now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" });
  const jstDate = new Date(jstString);
  const year = jstDate.getFullYear();
  const month = String(jstDate.getMonth() + 1).padStart(2, '0');
  const day = String(jstDate.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  // 周期設定のある顧客を全て取得
  const customers = db.prepare(`
    SELECT id, name, nextVisitDate
    FROM Customer
    WHERE visitInterval > 0
  `).all();

  const unvisitedList = [];

  for (const customer of customers) {
    if (!customer.nextVisitDate) continue;
    
    // nextVisitDate から YYYY-MM-DD 部分を抽出
    const nextVisitStr = customer.nextVisitDate.split('T')[0];

    // 予定日が今日よりも過去（昨日以前）の場合
    if (nextVisitStr < todayStr) {
      unvisitedList.push(customer.name);
    }
  }

  return unvisitedList;
}

/**
 * 全テナントを走査し、朝8時の定期送信ジョブを実行する
 * @param {import('better-sqlite3').Database} systemDb システムDB
 * @param {string} dataRoot データ領域ルート
 */
async function runDailyScheduleJob(systemDb, dataRoot) {
  try {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0:日, 1:月, ..., 6:土

    // 日曜日は送信しない
    if (dayOfWeek === 0) {
      console.log('[Scheduler] 本日は日曜日のため、定期送信をスキップします。');
      return;
    }

    // 祝日は送信しない
    if (isHoliday(today)) {
      console.log('[Scheduler] 本日は祝日のため、定期送信をスキップします。');
      return;
    }

    console.log('[Scheduler] 定期送信ジョブを開始します...');

    // 有効なテナント一覧を取得
    const tenants = systemDb.prepare(`
      SELECT * FROM "Tenant" WHERE isActive = 1
    `).all();

    for (const tenant of tenants) {
      if (!tenant.lineChannelAccessToken) continue;

      const dbPath = path.join(dataRoot, 'tenants', tenant.id, 'dev.db');
      if (!fs.existsSync(dbPath)) continue;

      const db = new Database(dbPath, { fileMustExist: true });
      ensureScheduleTable(db);

      // アクティブな定期送信対象ユーザーを取得
      const configUsers = db.prepare(`
        SELECT lineUserId FROM LineScheduleConfig WHERE isActive = 1
      `).all();

      if (configUsers.length === 0) continue;

      // 昨日までが来局予定日の未来店者リストを取得
      const unvisited = getOverdueUnvisitedCustomers(db);

      // 送信メッセージの構築
      let messageText = '';
      if (unvisited.length > 0) {
        messageText = `📢 昨日までに来局予定でしたが、まだ来局処理が完了していない顧客（未来店）のお知らせです。\n\n以下のメンバーの対応状況をご確認ください。\n\n${unvisited.map(name => `・ ${name}`).join('\n')}`;
      } else {
        messageText = `✨ 昨日までに来局予定の顧客のうち、未完了（未来店）の方はいません。`;
      }

      // 各ユーザーへプッシュ送信するためにクライアント作成
      const client = new messagingApi.MessagingApiClient({
        channelAccessToken: tenant.lineChannelAccessToken
      });

      // 各ユーザーへプッシュ送信
      for (const config of configUsers) {
        try {
          await client.pushMessage({
            to: config.lineUserId,
            messages: [{ type: 'text', text: messageText }]
          });
          console.log(`[Scheduler] 定期送信成功: テナント=${tenant.slug}, 送信先=${config.lineUserId}`);
        } catch (err) {
          console.error(`[Scheduler] 定期送信失敗: テナント=${tenant.slug}, 送信先=${config.lineUserId}`, err);
        }
      }
    }
  } catch (err) {
    console.error('[Scheduler] runDailyScheduleJob error:', err);
  }
}

/**
 * 朝8時のジョブをスケジュールする
 * @param {import('better-sqlite3').Database} systemDb システムDB
 * @param {string} dataRoot データ領域ルート
 */
function initScheduler(systemDb, dataRoot) {
  // 毎朝8時0分に実行
  cron.schedule('0 8 * * *', () => {
    runDailyScheduleJob(systemDb, dataRoot);
  }, {
    timezone: "Asia/Tokyo"
  });
  console.log('[Scheduler] 毎朝8時の定期送信ジョブがスケジュールされました。');
}

module.exports = {
  registerScheduler,
  unregisterScheduler,
  ensureScheduleTable,
  initScheduler,
  runDailyScheduleJob
};
