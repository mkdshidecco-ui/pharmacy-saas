import { PrismaClient as SystemPrismaClient } from '../apps/web/src/generated/system-client/index.js';
import { PrismaClient as TenantPrismaClient } from '../apps/web/src/generated/tenant-client/index.js';
import path from 'path';
import fs from 'fs';

// システムDBのURL
const systemDbUrl = process.env.SYSTEM_DATABASE_URL || 'file:./apps/web/prisma/system.db';
const systemDb = new SystemPrismaClient({
  datasources: {
    db: {
      url: systemDbUrl,
    },
  },
});

async function main() {
  console.log('Starting migration script via Prisma...');
  
  // テナント一覧を取得
  const tenants = await systemDb.tenant.findMany({
    where: { isActive: true },
  });

  // process.cwd() は apps/web
  const dataRoot = path.join(process.cwd(), '..', '..', 'data', 'tenants');
  console.log(`Searching for databases in: ${dataRoot}`);

  for (const tenant of tenants) {
    const dbPath = path.join(dataRoot, tenant.id, 'dev.db');
    if (!fs.existsSync(dbPath)) {
      console.log(`[SKIP] Database file not found for tenant: ${tenant.slug} (${tenant.id})`);
      continue;
    }

    const tenantDbUrl = `file:${dbPath}`;
    const tenantDb = new TenantPrismaClient({
      datasources: {
        db: {
          url: tenantDbUrl,
        },
      },
    });

    try {
      console.log(`[START] Migrating tables for tenant: ${tenant.slug}`);
      
      // LineUserWhitelist テーブルの作成
      await tenantDb.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS LineUserWhitelist (
          id         TEXT PRIMARY KEY,
          lineUserId TEXT UNIQUE NOT NULL,
          addedAt    TEXT NOT NULL DEFAULT (datetime('now'))
        )
      `);

      // LineScheduleConfig テーブルの作成
      await tenantDb.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS LineScheduleConfig (
          id         TEXT PRIMARY KEY,
          lineUserId TEXT UNIQUE NOT NULL,
          isActive   INTEGER NOT NULL DEFAULT 1,
          createdAt  TEXT NOT NULL DEFAULT (datetime('now')),
          updatedAt  TEXT NOT NULL DEFAULT (datetime('now'))
        )
      `);

      console.log(`[OK] Successfully migrated: ${tenant.slug}`);
    } catch (err: any) {
      console.error(`[ERROR] Failed to migrate tenant ${tenant.slug}:`, err.message);
    } finally {
      await tenantDb.$disconnect();
    }
  }

  await systemDb.$disconnect();
  console.log('Migration script completed.');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
