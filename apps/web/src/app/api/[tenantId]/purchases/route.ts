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
    const purchases = await db.purchaseRecord.findMany({
      include: {
        product: true,
      },
      orderBy: {
        purchasedAt: 'desc',
      },
      take: 100,
    });
    return NextResponse.json(purchases);
  } catch (error) {
    console.error('Failed to fetch purchases:', error);
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

    const { productId, quantity, wholesaler } = await request.json();

    if (!productId || typeof quantity !== 'number' || quantity <= 0 || !wholesaler) {
      return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
    }

    const db = getTenantDb(tenant.id);

    const result = await db.$transaction(async (tx) => {
      const purchase = await tx.purchaseRecord.create({
        data: {
          productId,
          quantity,
          wholesaler,
        },
        include: { product: true },
      });

      await tx.product.update({
        where: { id: productId },
        data: {
          currentStock: {
            increment: quantity,
          },
        },
      });

      return purchase;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to create purchase:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
