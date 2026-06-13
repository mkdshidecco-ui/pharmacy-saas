// カレンダーAPI: 任意期間の来店予定を繰り返しロジックで返す
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';
import { getCalendarVisits } from '@/lib/forecast';
import { getJapaneseHolidaysForRange } from '@/lib/holidays';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  try {
    const { tenantId } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const tenant = await resolveTenant(tenantId);
    if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

    // クエリパラメータで期間を指定（weekOffset: 0=今週, 1=来週, -1=先週など）
    const url = new URL(request.url);
    const weekOffset = parseInt(url.searchParams.get('weekOffset') || '0', 10);

    // 基準日（日本時間の今日の00:00:00を表すUTC Date）から weekOffset * 7 日シフトした16週間を表示
    const jstNow = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const today = new Date(Date.UTC(jstNow.getUTCFullYear(), jstNow.getUTCMonth(), jstNow.getUTCDate(), 0, 0, 0, 0));
    const baseDayOfWeek = today.getUTCDay();

    // その週の日曜日（UTC）から4週前を起点
    const baseSunday = new Date(today);
    baseSunday.setUTCDate(today.getUTCDate() - baseDayOfWeek - 28 + weekOffset * 7);

    const endDate = new Date(baseSunday);
    endDate.setUTCDate(baseSunday.getUTCDate() + 111); // 112日間 (16週間)

    const db = getTenantDb(tenant.id);
    const [visits, holidays] = await Promise.all([
      getCalendarVisits(db, baseSunday, endDate),
      Promise.resolve(getJapaneseHolidaysForRange(baseSunday, endDate)),
    ]);

    return NextResponse.json({
      startDate: baseSunday.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      weekOffset,
      visits,
      holidays,
    });
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
