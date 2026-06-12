'use strict';
/**
 * LINE Bot ユーザーホワイトリスト管理
 * テナントDBの LineUserWhitelist テーブルを使用してアクセス制御を行う
 */

/**
 * ホワイトリストに LineUserId が存在するか確認する
 * @param {import('better-sqlite3').Database} db テナントDB
 * @param {string} lineUserId LINE userId
 * @returns {boolean}
 */
function isWhitelisted(db, lineUserId) {
  try {
    // テーブルが存在しない場合は全員許可（後方互換）
    const tableExists = db.prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='LineUserWhitelist'`
    ).get();
    if (!tableExists) return true;

    const row = db.prepare(
      `SELECT 1 FROM LineUserWhitelist WHERE lineUserId = ? LIMIT 1`
    ).get(lineUserId);
    return !!row;
  } catch (err) {
    console.error('[Whitelist] isWhitelisted error:', err);
    // エラー時は安全のため拒否
    return false;
  }
}

/**
 * ホワイトリストに LineUserId を追加する
 * @param {import('better-sqlite3').Database} db テナントDB
 * @param {string} lineUserId LINE userId
 * @returns {boolean} 追加成功かどうか
 */
function addToWhitelist(db, lineUserId) {
  try {
    db.prepare(
      `INSERT OR IGNORE INTO LineUserWhitelist (id, lineUserId, addedAt) VALUES (lower(hex(randomblob(16))), ?, datetime('now'))`
    ).run(lineUserId);
    return true;
  } catch (err) {
    console.error('[Whitelist] addToWhitelist error:', err);
    return false;
  }
}

/**
 * ホワイトリストから LineUserId を削除する
 * @param {import('better-sqlite3').Database} db テナントDB
 * @param {string} lineUserId LINE userId
 * @returns {boolean} 削除成功かどうか
 */
function removeFromWhitelist(db, lineUserId) {
  try {
    const result = db.prepare(
      `DELETE FROM LineUserWhitelist WHERE lineUserId = ?`
    ).run(lineUserId);
    return result.changes > 0;
  } catch (err) {
    console.error('[Whitelist] removeFromWhitelist error:', err);
    return false;
  }
}

/**
 * テナントDBに LineUserWhitelist テーブルが存在しない場合に作成する
 * @param {import('better-sqlite3').Database} db テナントDB
 */
function ensureWhitelistTable(db) {
  try {
    db.prepare(`
      CREATE TABLE IF NOT EXISTS LineUserWhitelist (
        id         TEXT PRIMARY KEY,
        lineUserId TEXT UNIQUE NOT NULL,
        addedAt    TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `).run();
  } catch (err) {
    console.error('[Whitelist] ensureWhitelistTable error:', err);
  }
}

module.exports = { isWhitelisted, addToWhitelist, removeFromWhitelist, ensureWhitelistTable };
