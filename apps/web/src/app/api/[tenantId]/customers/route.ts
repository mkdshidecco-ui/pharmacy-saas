import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';
import { calculateNextVisitDate } from '@/lib/forecast';

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
    const customers = await db.customer.findMany({
      include: {
        requirements: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  try {
    const { tenantId } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const tenant = await resolveTenant(tenantId);
    if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

    const { name, visitInterval, lastVisitDate } = await request.json();
    if (!name || typeof visitInterval !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
    }

    const calculatedLastVisit = lastVisitDate ? new Date(lastVisitDate) : null;
    const calculatedNextVisit = calculateNextVisitDate(visitInterval, calculatedLastVisit);

    const db = getTenantDb(tenant.id);
    const customer = await db.customer.create({
      data: {
        name,
        visitInterval,
        lastVisitDate: calculatedLastVisit,
        nextVisitDate: calculatedNextVisit,
      },
    });
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('Failed to create customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
