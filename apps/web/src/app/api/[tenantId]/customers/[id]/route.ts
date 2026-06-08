import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';
import { calculateNextVisitDate } from '@/lib/forecast';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string; id: string }> }
) {
  try {
    const { tenantId, id } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const tenant = await resolveTenant(tenantId);
    if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

    const db = getTenantDb(tenant.id);
    const customer = await db.customer.findUnique({
      where: { id },
      include: {
        requirements: {
          include: {
            product: true,
          },
          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
    });
    if (!customer) return NextResponse.json({ error: '顧客が見つかりません' }, { status: 404 });

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Failed to fetch customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ tenantId: string; id: string }> }
) {
  try {
    const { tenantId, id } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const tenant = await resolveTenant(tenantId);
    if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

    const db = getTenantDb(tenant.id);
    const { name, visitInterval, lastVisitDate, nextVisitDate } = await request.json();

    // 既存顧客情報を取得
    const existingCustomer = await db.customer.findUnique({
      where: { id },
    });
    if (!existingCustomer) {
      return NextResponse.json({ error: '顧客が見つかりません' }, { status: 404 });
    }

    const updatedVisitInterval = typeof visitInterval === 'number' ? visitInterval : existingCustomer.visitInterval;
    const updatedLastVisitDate = lastVisitDate !== undefined
      ? (lastVisitDate ? new Date(lastVisitDate) : null)
      : existingCustomer.lastVisitDate;

    // nextVisitDateを再計算
    let updatedNextVisitDate = existingCustomer.nextVisitDate;
    if (typeof visitInterval === 'number' || lastVisitDate !== undefined) {
      updatedNextVisitDate = calculateNextVisitDate(updatedVisitInterval, updatedLastVisitDate);
    } else if (nextVisitDate) {
      updatedNextVisitDate = new Date(nextVisitDate);
    }

    const customer = await db.customer.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name } : {}),
        visitInterval: updatedVisitInterval,
        lastVisitDate: updatedLastVisitDate,
        nextVisitDate: updatedNextVisitDate,
      },
    });
    return NextResponse.json(customer);
  } catch (error) {
    console.error('Failed to update customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string; id: string }> }
) {
  try {
    const { tenantId, id } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const tenant = await resolveTenant(tenantId);
    if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

    const db = getTenantDb(tenant.id);
    await db.customer.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
