import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';

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

    const { customerId, requirements } = await request.json();
    if (!customerId || !Array.isArray(requirements)) {
      return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
    }

    const db = getTenantDb(tenant.id);

    // トランザクションで安全に一括更新（追加・訂正・削除を一括で行う）
    await db.$transaction(async (tx) => {
      // 既存の紐付けを一度全削除
      await tx.customerRequirement.deleteMany({
        where: { customerId },
      });

      // 新しい紐付けを登録
      if (requirements.length > 0) {
        await tx.customerRequirement.createMany({
          data: requirements.map((req: { productId: string; quantity: number }) => ({
            customerId,
            productId: req.productId,
            quantity: req.quantity, // Float対応
          })),
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update customer requirements:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
