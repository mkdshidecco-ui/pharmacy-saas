import { PrismaClient as TenantPrismaClient } from '@/generated/tenant-client';
import path from 'path';
// @ts-ignore
import Database from 'better-sqlite3';

// テナントDBクライアントのキャッシュ
const clientCache = new Map<string, TenantPrismaClient>();

/**
 * SQLite WALモード・パフォーマンス設定を適用する
 * WALモードにより、読み込みと書き込みが並行して行えるようになりI/Oを大幅削減
 */
function applyWalMode(dbPath: string): void {
  try {
    const db = new Database(dbPath, { fileMustExist: false });
    db.pragma('journal_mode = WAL');
    db.pragma('synchronous = NORMAL');
    db.pragma('cache_size = -8000');    // 8MB キャッシュ
    db.pragma('temp_store = MEMORY');
    db.pragma('mmap_size = 67108864'); // 64MB mmap
    db.close();
  } catch {
    // DBが存在しない場合は無視（後でPrismaが作成する）
  }
}

/**
 * テナントIDに対応するPrismaClientを返す
 * DBファイルは /data/tenants/[tenantId]/dev.db に配置される
 */
export function getTenantDb(tenantId: string): TenantPrismaClient {
  if (clientCache.has(tenantId)) {
    return clientCache.get(tenantId)!;
  }

  const dataRoot = process.env.DATA_ROOT || '/data';
  const dbPath = path.join(dataRoot, 'tenants', tenantId, 'dev.db');

  // WALモードを適用してからPrismaClientを作成
  applyWalMode(dbPath);

  const client = new TenantPrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });

  // 接続の再利用とクエリエンジン起動負荷削減のため、開発・本番環境ともにキャッシュする
  clientCache.set(tenantId, client);

  return client;
}

/**
 * テナントDBのパスを返す
 */
export function getTenantDbPath(tenantId: string): string {
  const dataRoot = process.env.DATA_ROOT || '/data';
  return path.join(dataRoot, 'tenants', tenantId, 'dev.db');
}

/**
 * スラッグまたはIDからテナントDBを取得するヘルパー
 */
export function getTenantDbById(tenantDbId: string): TenantPrismaClient {
  return getTenantDb(tenantDbId);
}
