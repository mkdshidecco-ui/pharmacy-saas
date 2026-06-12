/**
 * 日本の祝日ユーティリティ
 * japanese-holidays パッケージを使い、指定期間の祝日マップを返す
 *
 * パッケージ仕様: getHolidaysOf(year) は
 *   { month: number, date: number (day of month), name: string }[]
 * を返す。holiday.date は「日付（数値）」であり Date オブジェクトではない。
 */
// @ts-ignore
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
    // getHolidaysOf は { month: number, date: number, name: string }[] を返す
    const holidays: { month: number; date: number; name: string }[] = getHolidaysOf(year);
    for (const holiday of holidays) {
      // month は 1-indexed、date は day of month (1-31)
      const d = new Date(Date.UTC(year, holiday.month - 1, holiday.date));

      // 期間内のみ追加
      if (d >= startDate && d <= endDate) {
        const dateStr = d.toISOString().split('T')[0];
        result[dateStr] = holiday.name;
      }
    }
  }

  return result;
}
