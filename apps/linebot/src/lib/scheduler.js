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
 * 特定のテナントの本日の未来店者リストを取得する
 * @param {import('better-sqlite3').Database} db テナントDB
 * @returns {string[]} 未来店者の名前リスト
 */
function getTodayUnvisitedCustomers(db) {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  
  // 周期設定のある顧客を全て取得
  const customers = db.prepare(`
    SELECT id, name, visitInterval, nextVisitDate
    FROM Customer
    WHERE visitInterval > 0
  `).all();

  const unvisitedList = [];

  for (const customer of customers) {
    const interval = customer.visitInterval;
    let tempDate = new Date(customer.nextVisitDate);
    tempDate.setHours(0, 0, 0, 0);

    // 今日の0時以前である場合、今日以降まで進める
    while (tempDate < startOfDay) {
      tempDate.setDate(tempDate.getDate() + interval);
    }

    const tempDateStr = tempDate.toISOString().split('T')[0];

    // 予定日が今日と一致する場合
    if (tempDateStr === todayStr) {
      // 本日すでに実績があるかチェック
      const visited = db.prepare(`
        SELECT 1 FROM VisitRecord
        WHERE customerId = ? AND date(visitedAt, 'localtime') = ?
        LIMIT 1
      `).get(customer.id, todayStr);

      if (!visited) {
        // 実績がなければ未来店者として追加
        unvisitedList.push(customer.name);
      }
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

      // 本日の未来店者リストを取得
      const unvisited = getTodayUnvisitedCustomers(db);

      // 送信メッセージの構築
      let messageText = '';
      if (unvisited.length > 0) {
        messageText = `📢 本日の来店予定者（未来店）のお知らせです。\n\n以下のメンバーの来店予定がありますが、まだ来店処理が完了していません。\n\n${unvisited.map(name => `・ ${name}`).join('\n')}\n\n本日中の対応をお願いいたします。`;
      } else {
        messageText = `✨ 本日の来店予定者（未来店）のお知らせです。\n\n本日予定されている未来店の顧客はいません。`;
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
