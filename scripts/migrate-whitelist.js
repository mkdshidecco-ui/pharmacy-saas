const path = require('path');
module.paths.push(path.join(__dirname, '..', 'apps', 'linebot', 'node_modules'));
const Database = require('better-sqlite3');
const fs = require('fs');

const dataRoot = path.join(__dirname, '..', 'data', 'tenants');

if (!fs.existsSync(dataRoot)) {
  console.log('No tenants directory found, skipping migration.');
  process.exit(0);
}

const tenantDirs = fs.readdirSync(dataRoot);
for (const tenantId of tenantDirs) {
  const dbPath = path.join(dataRoot, tenantId, 'dev.db');
  if (!fs.existsSync(dbPath)) continue;

  try {
    const db = new Database(dbPath);
    db.prepare(`
      CREATE TABLE IF NOT EXISTS LineUserWhitelist (
        id         TEXT PRIMARY KEY,
        lineUserId TEXT UNIQUE NOT NULL,
        addedAt    TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `).run();
    db.prepare(`
      CREATE TABLE IF NOT EXISTS LineScheduleConfig (
        id         TEXT PRIMARY KEY,
        lineUserId TEXT UNIQUE NOT NULL,
        isActive   INTEGER NOT NULL DEFAULT 1,
        createdAt  TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt  TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `).run();
    db.close();
    console.log(`[OK] Migrated: ${tenantId}`);
  } catch (err) {
    console.error(`[ERROR] Failed to migrate ${tenantId}:`, err.message);
  }
}
console.log('Migration complete.');
