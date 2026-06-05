/**
 * rename-tenant.ts
 *
 * テナント表示名「柳屋薬局」を「ヤナギヤ薬局」に一括更新するスクリプト。
 * Prisma を直接使用してシステムDBを更新します。
 *
 * 使い方（apps/web ディレクトリ内で実行）:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/rename-tenant.ts
 *
 * または package.json にスクリプトを追加してから:
 *   npm run rename-tenant
 *
 * 注意:
 *   - このスクリプトは冪等です（何度実行しても同じ結果になります）
 *   - 本番DBとローカルDBのどちらにも使用できます
 *   - 環境変数 SYSTEM_DATABASE_URL が設定されていない場合は
 *     デフォルトパス (file:/data/system/tenants.db) を使用します
 */

import { PrismaClient } from '../src/generated/system-client';

const OLD_NAME = '柳屋薬局';
const NEW_NAME = 'ヤナギヤ薬局';

async function renameTenant() {
  const systemDb = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    datasources: {
      db: {
        url:
          process.env.SYSTEM_DATABASE_URL || 'file:/data/system/tenants.db',
      },
    },
  });

  console.log('='.repeat(50));
  console.log('  Tenant Rename Script');
  console.log(`  "${OLD_NAME}" → "${NEW_NAME}"`);
  console.log('='.repeat(50));

  try {
    await systemDb.$connect();
    console.log('[1/3] DB接続完了');

    // 変更対象のテナントを検索
    const targets = await systemDb.tenant.findMany({
      where: { displayName: OLD_NAME },
    });

    if (targets.length === 0) {
      console.log(`\n[INFO] 「${OLD_NAME}」という表示名のテナントは見つかりませんでした。`);
      console.log('       すでに変更済みか、テナントが存在しない可能性があります。');
      console.log('\n現在登録されているすべてのテナント:');
      const allTenants = await systemDb.tenant.findMany({
        select: { id: true, slug: true, displayName: true, isActive: true },
      });
      if (allTenants.length === 0) {
        console.log('  （テナントなし）');
      } else {
        allTenants.forEach((t) => {
          console.log(`  - [${t.isActive ? '有効' : '無効'}] ${t.displayName} (slug: ${t.slug})`);
        });
      }
      return;
    }

    console.log(`[2/3] ${targets.length} 件のテナントが対象です:`);
    targets.forEach((t) => {
      console.log(`      - ${t.displayName} (id: ${t.id}, slug: ${t.slug})`);
    });

    // 一括更新実行
    const result = await systemDb.tenant.updateMany({
      where: { displayName: OLD_NAME },
      data: { displayName: NEW_NAME },
    });

    console.log(`[3/3] 更新完了: ${result.count} 件を「${NEW_NAME}」に変更しました。`);

    // 更新後の確認
    console.log('\n更新後の確認:');
    const updated = await systemDb.tenant.findMany({
      where: { displayName: NEW_NAME },
      select: { id: true, slug: true, displayName: true, updatedAt: true },
    });
    updated.forEach((t) => {
      console.log(`  ✓ ${t.displayName} (slug: ${t.slug}, updatedAt: ${t.updatedAt.toISOString()})`);
    });

    console.log('\n=== 完了 ===');
  } catch (error) {
    console.error('\n[ERROR] スクリプト実行中にエラーが発生しました:', error);
    process.exit(1);
  } finally {
    await systemDb.$disconnect();
  }
}

renameTenant();
