/**
 * 日本の祝日ユーティリティ
 * japanese-holidays パッケージを使い、指定期間の祝日マップを返す
 */
import { getHolidaysOf } from 'japanese-holidays';

/**
 * 指定期間の祝日を { 'YYYY-MM-DD': '祝日名' } の形式で返す
 */
export function getJapaneseHolidaysForRange(
  startDate: Date,
  endDate: Date
): Record<string, string> {
  const result: Record<string, string> = {};

  // 対象となる年一覧（複数年をまたぐ場合に対応）
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  for (let year = startYear; year <= endYear; year++) {
    const holidays = getHolidaysOf(year);
    for (const holiday of holidays) {
      // holiday.date は Date オブジェクト
      const d = new Date(holiday.date);
      const dateStr = d.toISOString().split('T')[0];

      // 期間内のみ追加
      if (d >= startDate && d <= endDate) {
        result[dateStr] = holiday.name;
      }
    }
  }

  return result;
}
