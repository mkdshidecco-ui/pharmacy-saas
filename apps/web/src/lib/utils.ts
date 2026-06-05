/**
 * テナントIDを systemDb から解決するヘルパー
 * スラッグまたは内部IDを受け取り、Tenantオブジェクトを返す
 */
import { systemDb } from './system-db';

export async function resolveTenant(tenantId: string) {
  return systemDb.tenant.findFirst({
    where: {
      OR: [{ slug: tenantId }, { id: tenantId }],
      isActive: true,
    },
  });
}

/**
 * Float値を小数点以下2桁に丸める
 */
export function roundFloat(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Float値を表示用文字列に変換（不要な末尾ゼロを除去）
 */
export function formatFloat(value: number): string {
  // 小数点以下2桁まで表示（末尾0は除去）
  return parseFloat(value.toFixed(2)).toString();
}
