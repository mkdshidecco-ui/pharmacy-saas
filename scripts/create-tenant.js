const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// 引数パース
const [,, slug, displayName, adminEmail, adminPassword, adminName = '店舗管理者'] = process.argv;

if (!slug || !displayName || !adminEmail || !adminPassword) {
  console.log('--- PharmaSaaS テナント作成スクリプト ---');
  console.log('使い方:');
  console.log('node scripts/create-tenant.js <店舗ID(slug)> <店舗表示名> <管理者メール> <パスワード> [<管理者名>]');
  console.log('例:');
  console.log('node scripts/create-tenant.js yanagiya-pharmacy "柳屋薬局" admin@yanagiya.com password123 "柳屋 太郎"');
  process.exit(1);
}

const DATA_ROOT = process.env.DATA_ROOT || path.join(__dirname, '../data');
const systemDbPath = path.join(DATA_ROOT, 'system', 'tenants.db');
const tenantDir = path.join(DATA_ROOT, 'tenants', slug);
const tenantDbPath = path.join(tenantDir, 'dev.db');

console.log(`[開始] テナント作成: ${displayName} (${slug})`);

// 1. システムDB・ディレクトリの準備
try {
  fs.mkdirSync(path.dirname(systemDbPath), { recursive: true });
  fs.mkdirSync(tenantDir, { recursive: true });
} catch (err) {
  console.error('ディレクトリ作成失敗:', err);
  process.exit(1);
}

// 2. システムDBにレコード追加
let systemDb;
let tenantId = crypto.randomUUID();
try {
  systemDb = new Database(systemDbPath);
  
  // テナントテーブル作成（存在しない場合用）
  systemDb.exec(`
    CREATE TABLE IF NOT EXISTS "Tenant" (
      "id" TEXT PRIMARY KEY,
      "slug" TEXT UNIQUE,
      "displayName" TEXT,
      "industry" TEXT DEFAULT 'pharmacy',
      "lineChannelSecret" TEXT,
      "lineChannelAccessToken" TEXT,
      "isActive" INTEGER DEFAULT 1,
      "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const existing = systemDb.prepare('SELECT id FROM "Tenant" WHERE slug = ?').get(slug);
  if (existing) {
    console.warn(`[注意] スラッグ「${slug}」は既にシステムDBに存在します。DB初期化と管理者作成のみ実行します。`);
    tenantId = existing.id;
  } else {
    systemDb.prepare(`
      INSERT INTO "Tenant" (id, slug, displayName, industry, isActive)
      VALUES (?, ?, ?, 'pharmacy', 1)
    `).run(tenantId, slug, displayName);
    console.log(`[成功] システムDBにテナントレコードを登録しました (ID: ${tenantId})`);
  }
} catch (err) {
  console.error('システムDB登録失敗:', err);
  process.exit(1);
} finally {
  if (systemDb) systemDb.close();
}

// 3. テナント用データベースのスキーママイグレーション
console.log(`[実行] テナントDBマイグレーションを実行中...`);
const webPath = path.resolve(path.join(__dirname, '../apps/web'));
try {
  // 環境変数 TENANT_DATABASE_URL を上書きして prisma db push を実行
  const absDbPath = path.resolve(tenantDbPath);
  execSync(`npx prisma db push --schema=./prisma/tenant.prisma`, {
    cwd: webPath,
    env: {
      ...process.env,
      TENANT_DATABASE_URL: `file:${absDbPath}`
    },
    stdio: 'inherit'
  });
  console.log('[成功] テナント用データベースのテーブル構築完了');
} catch (err) {
  console.error('Prismaマイグレーションに失敗しました:', err);
  process.exit(1);
}

// 4. 初期管理者ユーザーの作成
console.log(`[実行] 管理者ユーザー「${adminName} (${adminEmail})」を登録中...`);
let tenantDb;
try {
  tenantDb = new Database(tenantDbPath);
  const hashedPassword = bcrypt.hashSync(adminPassword, 10);
  
  // 既存ユーザーチェック
  const existingUser = tenantDb.prepare('SELECT id FROM "User" WHERE email = ?').get(adminEmail);
  if (existingUser) {
    tenantDb.prepare('UPDATE "User" SET password = ?, name = ? WHERE id = ?').run(hashedPassword, adminName, existingUser.id);
    console.log('[更新] 既存の管理者パスワードを更新しました。');
  } else {
    tenantDb.prepare(`
      INSERT INTO "User" (id, email, password, name, role, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, 'owner', datetime('now'), datetime('now'))
    `).run(crypto.randomUUID(), adminEmail, hashedPassword, adminName);
    console.log('[成功] 管理者ユーザーを新規登録しました。');
  }
} catch (err) {
  console.error('管理者ユーザー登録失敗:', err);
  process.exit(1);
} finally {
  if (tenantDb) tenantDb.close();
}

console.log(`[完了] テナント「${displayName}」の初期設定がすべて正常に完了しました！`);
console.log(`ポータルURL: http://localhost:3000/tenant/${slug}`);
