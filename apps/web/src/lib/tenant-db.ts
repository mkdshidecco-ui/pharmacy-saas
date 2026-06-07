import { PrismaClient as TenantPrismaClient } from '@/generated/tenant-client';
import path from 'path';

// テナントDBクライアントのキャッシュ（開発環境用）
const clientCache = new Map<string, TenantPrismaClient>();

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
 * systemDbでルックアップしてからtenant.idでDBパスを解決する
 */
export function getTenantDbById(tenantDbId: string): TenantPrismaClient {
  return getTenantDb(tenantDbId);
}
