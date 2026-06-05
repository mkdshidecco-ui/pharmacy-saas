import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ tenantId: string; id: string }> }
) {
  const { tenantId, id } = await params;
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

  const tenant = await resolveTenant(tenantId);
  if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

  const { name, currentStock, unit } = await request.json();
  const db = getTenantDb(tenant.id);
  const product = await db.product.update({
    where: { id },
    data: {
      name: name || undefined,
      // Float対応: 小数点以下2桁・マイナス値許容
      currentStock: typeof currentStock === 'number'
        ? Math.round(currentStock * 100) / 100
        : undefined,
      unit: unit !== undefined ? unit : undefined,
    },
  });
  return NextResponse.json(product);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string; id: string }> }
) {
  const { tenantId, id } = await params;
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

  const tenant = await resolveTenant(tenantId);
  if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

  const db = getTenantDb(tenant.id);
  await db.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
