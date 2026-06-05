import { PrismaClient as SystemPrismaClient } from '@/generated/system-client';

// システムDB（テナント管理用）のシングルトンクライアント
const globalForSystem = globalThis as unknown as { systemPrisma: SystemPrismaClient };

export const systemDb =
  globalForSystem.systemPrisma ||
  new SystemPrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.SYSTEM_DATABASE_URL || `file:/data/system/tenants.db`,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForSystem.systemPrisma = systemDb;
