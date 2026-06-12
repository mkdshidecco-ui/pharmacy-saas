import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';
import { getBaseDate, calculateDemandForecast, getDeadStock, getCalendarVisits } from '@/lib/forecast';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  try {
    const { tenantId } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const tenant = await resolveTenant(tenantId);
    if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

    const db = getTenantDb(tenant.id);
    const today = getBaseDate();

    // ダッシュボード用: 前後2週間スケジュール（3週→2週に短縮でI/O削減）
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 14);
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 14);

    const [nextWeekForecast, nextMonthForecast, deadStocks, calendarVisits] = await Promise.all([
      calculateDemandForecast(db, 7),
      calculateDemandForecast(db, 30),
      getDeadStock(db),
      getCalendarVisits(db, startDate, endDate),
    ]);

    const todayStr = today.toISOString().split('T')[0];

    // 日付順にソートし、来店済み(isCompleted)フラグを付与
    const schedule = calendarVisits
      .map((v) => ({
        ...v,
        isPast: v.visitDate < todayStr,
      }))
      .sort((a, b) => a.visitDate.localeCompare(b.visitDate));

    return NextResponse.json({
      baseDate: today.toISOString(),
      schedule,
      forecast: { nextWeek: nextWeekForecast, nextMonth: nextMonthForecast },
      alerts: {
        nextWeek: nextWeekForecast.filter((f) => f.isDeficit),
        nextMonth: nextMonthForecast.filter((f) => f.isDeficit),
      },
      deadStocks,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
