import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';

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
    const sales = await db.visitRecord.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        visitedAt: 'desc',
      },
      take: 100,
    });
    return NextResponse.json(sales);
  } catch (error) {
    console.error('Failed to fetch sales history:', error);
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

    const { productId, quantity, date } = await request.json();

    if (!productId || typeof quantity !== 'number' || quantity <= 0) {
      return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
    }

    const db = getTenantDb(tenant.id);

    // 「一般顧客」を検索または作成（来店周期 0 = 来店不要フラグ）
    let generalCustomer = await db.customer.findFirst({
      where: { name: '一般顧客' },
    });

    if (!generalCustomer) {
      generalCustomer = await db.customer.create({
        data: {
          name: '一般顧客',
          visitInterval: 0, // 来店不要フラグ
          nextVisitDate: new Date('2099-12-31T00:00:00Z'), // 予定に入らないようにする
        },
      });
    }

    const saleDate = date ? new Date(date) : new Date();

    const result = await db.$transaction(async (tx) => {
      // 1. 在庫を減算（Float対応）
      await tx.product.update({
        where: { id: productId },
        data: {
          currentStock: {
            decrement: quantity,
          },
        },
      });

      // 2. 来店実績を作成
      const visitRecord = await tx.visitRecord.create({
        data: {
          customerId: generalCustomer!.id,
          visitedAt: saleDate,
          items: {
            create: [
              {
                productId,
                quantity,
              },
            ],
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          customer: true,
        },
      });

      return visitRecord;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to create manual sale:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
