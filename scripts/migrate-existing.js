const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const { execSync } = require('child_process');

const [,, sourceDbPath, targetSlug] = process.argv;

if (!sourceDbPath || !targetSlug) {
  console.log('--- PharmaSaaS 既存データ移行スクリプト ---');
  console.log('使い方:');
  console.log('node scripts/migrate-existing.js <既存のSQLiteファイルパス(dev.db)> <移行先店舗ID(slug)>');
  console.log('例:');
  console.log('node scripts/migrate-existing.js ../demand-forecast-app/dev.db yanagiya-pharmacy');
  process.exit(1);
}

const DATA_ROOT = process.env.DATA_ROOT || path.join(__dirname, '../data');
const systemDbPath = path.join(DATA_ROOT, 'system', 'tenants.db');
const targetDir = path.join(DATA_ROOT, 'tenants', targetSlug);
const targetDbPath = path.join(targetDir, 'dev.db');

console.log(`[開始] データ移行: ${sourceDbPath} -> ${targetDbPath}`);

if (!fs.existsSync(sourceDbPath)) {
  console.error(`[エラー] 移行元ファイルが見つかりません: ${sourceDbPath}`);
  process.exit(1);
}

// 1. テナントがシステムDBに登録されているか確認
let systemDb;
let tenantRecord = null;
try {
  systemDb = new Database(systemDbPath);
  tenantRecord = systemDb.prepare('SELECT * FROM "Tenant" WHERE slug = ?').get(targetSlug);
} catch (err) {
  console.error('システムDB接続失敗:', err);
  process.exit(1);
} finally {
  if (systemDb) systemDb.close();
}

if (!tenantRecord) {
  console.log(`[自動処理] 移行先店舗「${targetSlug}」が未登録のため、自動的にシステムDBに登録します...`);
  // create-tenant スクリプトを走らせて初期設定
  try {
    execSync(`node scripts/create-tenant.js ${targetSlug} "移行店舗" admin@${targetSlug}.local password123`, {
      stdio: 'inherit'
    });
    console.log('[成功] テナントの自動初期構築が完了しました');
  } catch (err) {
    console.error('自動テナント構築に失敗しました。移行を中止します。');
    process.exit(1);
  }
}

// 2. 移行元と移行先のDB接続を開く
let sourceDb;
let targetDb;
try {
  sourceDb = new Database(sourceDbPath);
  targetDb = new Database(targetDbPath);
  console.log('[疎通] 両方のデータベース接続に成功しました');
} catch (err) {
  console.error('データベース接続エラー:', err);
  process.exit(1);
}

// 3. データ移行の実行 (トランザクション処理)
try {
  targetDb.transaction(() => {
    // 既存データを一度全削除（コンフリクト防止）
    console.log('[クリーン] 既存の移行先テーブルデータをクリーンアップ中...');
    targetDb.prepare('DELETE FROM "DisposalRecord"').run();
    targetDb.prepare('DELETE FROM "VisitRecordItem"').run();
    targetDb.prepare('DELETE FROM "VisitRecord"').run();
    targetDb.prepare('DELETE FROM "PurchaseRecord"').run();
    targetDb.prepare('DELETE FROM "CustomerRequirement"').run();
    targetDb.prepare('DELETE FROM "Customer"').run();
    targetDb.prepare('DELETE FROM "Product"').run();

    // -- A. Productのコピー --
    console.log('[コピー] Product テーブル...');
    const products = sourceDb.prepare('SELECT * FROM "Product"').all();
    const insertProduct = targetDb.prepare(`
      INSERT INTO "Product" (id, name, currentStock, unit, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    for (const p of products) {
      insertProduct.run(p.id, p.name, p.currentStock, p.unit || null, p.createdAt || new Date().toISOString(), p.updatedAt || new Date().toISOString());
    }

    // -- B. Customerのコピー --
    console.log('[コピー] Customer テーブル...');
    const customers = sourceDb.prepare('SELECT * FROM "Customer"').all();
    const insertCustomer = targetDb.prepare(`
      INSERT INTO "Customer" (id, name, visitInterval, lastVisitDate, nextVisitDate, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const c of customers) {
      insertCustomer.run(
        c.id,
        c.name,
        c.visitInterval || 14,
        c.lastVisitDate || null,
        c.nextVisitDate,
        c.createdAt || new Date().toISOString(),
        c.updatedAt || new Date().toISOString()
      );
    }

    // -- C. CustomerRequirementのコピー --
    console.log('[コピー] CustomerRequirement テーブル...');
    const requirements = sourceDb.prepare('SELECT * FROM "CustomerRequirement"').all();
    const insertReq = targetDb.prepare(`
      INSERT INTO "CustomerRequirement" (id, customerId, productId, quantity, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    for (const r of requirements) {
      insertReq.run(
        r.id,
        r.customerId,
        r.productId,
        r.quantity,
        r.createdAt || new Date().toISOString(),
        r.updatedAt || new Date().toISOString()
      );
    }

    // -- D. PurchaseRecordのコピー --
    console.log('[コピー] PurchaseRecord テーブル...');
    const purchases = sourceDb.prepare('SELECT * FROM "PurchaseRecord"').all();
    const insertPurchase = targetDb.prepare(`
      INSERT INTO "PurchaseRecord" (id, productId, quantity, wholesaler, purchasedAt, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    for (const p of purchases) {
      insertPurchase.run(
        p.id,
        p.productId,
        p.quantity,
        p.wholesaler,
        p.purchasedAt,
        p.createdAt || new Date().toISOString()
      );
    }

    // -- E. VisitRecordのコピー --
    console.log('[コピー] VisitRecord テーブル...');
    const visits = sourceDb.prepare('SELECT * FROM "VisitRecord"').all();
    const insertVisit = targetDb.prepare(`
      INSERT INTO "VisitRecord" (id, customerId, visitedAt, createdAt)
      VALUES (?, ?, ?, ?)
    `);
    for (const v of visits) {
      insertVisit.run(
        v.id,
        v.customerId,
        v.visitedAt,
        v.createdAt || new Date().toISOString()
      );
    }

    // -- F. VisitRecordItemのコピー --
    console.log('[コピー] VisitRecordItem テーブル...');
    const visitItems = sourceDb.prepare('SELECT * FROM "VisitRecordItem"').all();
    const insertVisitItem = targetDb.prepare(`
      INSERT INTO "VisitRecordItem" (id, visitRecordId, productId, quantity, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `);
    for (const vi of visitItems) {
      insertVisitItem.run(
        vi.id,
        vi.visitRecordId,
        vi.productId,
        vi.quantity,
        vi.createdAt || new Date().toISOString()
      );
    }

    // -- G. DisposalRecordのコピー --
    console.log('[コピー] DisposalRecord テーブル...');
    const disposals = sourceDb.prepare('SELECT * FROM "DisposalRecord"').all();
    const insertDisposal = targetDb.prepare(`
      INSERT INTO "DisposalRecord" (id, productId, quantity, reason, disposedAt, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    for (const d of disposals) {
      insertDisposal.run(
        d.id,
        d.productId,
        d.quantity,
        d.reason || null,
        d.disposedAt,
        d.createdAt || new Date().toISOString()
      );
    }
  })();

  console.log(`[成功] 既存の薬局在庫管理・来店予測データが店舗「${targetSlug}」に正常に移行されました！`);
  console.log(`移行サマリー:`);
  const prodCount = targetDb.prepare('SELECT count(*) as count FROM "Product"').get().count;
  const custCount = targetDb.prepare('SELECT count(*) as count FROM "Customer"').get().count;
  const visitCount = targetDb.prepare('SELECT count(*) as count FROM "VisitRecord"').get().count;
  console.log(`- 移植商品数: ${prodCount} 件`);
  console.log(`- 移植顧客数: ${custCount} 件`);
  console.log(`- 移植来店履歴数: ${visitCount} 件`);

} catch (err) {
  console.error('[移行失敗] トランザクション処理中にエラーが発生し、ロールバックされました:', err);
  process.exit(1);
} finally {
  if (sourceDb) sourceDb.close();
  if (targetDb) targetDb.close();
}
