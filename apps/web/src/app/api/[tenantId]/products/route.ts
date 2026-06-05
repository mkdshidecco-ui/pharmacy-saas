import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  const { tenantId } = await params;
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

  const tenant = await resolveTenant(tenantId);
  if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

  const db = getTenantDb(tenant.id);
  const products = await db.product.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(products);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  const { tenantId } = await params;
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

  const tenant = await resolveTenant(tenantId);
  if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

  const { name, currentStock, unit } = await request.json();
  if (!name || typeof currentStock !== 'number') {
    return NextResponse.json({ error: 'パラメータが不正です' }, { status: 400 });
  }

  const db = getTenantDb(tenant.id);
  const product = await db.product.create({
    data: {
      name,
      currentStock: Math.round(currentStock * 100) / 100, // 小数点以下2桁
      unit: unit || null,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
