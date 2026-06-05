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
    const disposals = await db.disposalRecord.findMany({
      include: {
        product: true,
      },
      orderBy: {
        disposedAt: 'desc',
      },
      take: 100,
    });
    return NextResponse.json(disposals);
  } catch (error) {
    console.error('Failed to fetch disposals:', error);
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

    const { productId, quantity, reason, date } = await request.json();

    if (!productId || typeof quantity !== 'number' || quantity <= 0) {
      return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
    }

    const disposalDate = date ? new Date(date) : new Date();
    const db = getTenantDb(tenant.id);

    const result = await db.$transaction(async (tx) => {
      const disposal = await tx.disposalRecord.create({
        data: {
          productId,
          quantity,
          reason: reason || null,
          disposedAt: disposalDate,
        },
        include: { product: true },
      });

      await tx.product.update({
        where: { id: productId },
        data: {
          currentStock: {
            decrement: quantity,
          },
        },
      });

      return disposal;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to create disposal:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
