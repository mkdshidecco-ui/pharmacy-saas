import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';

/**
 * DELETE /api/[tenantId]/sales/[id]
 * 指定した来局記録（VisitRecord）を削除し、在庫を払い戻す
 */
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

    // 削除対象の VisitRecord（+ VisitRecordItem）を取得
    const visitRecord = await db.visitRecord.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!visitRecord) {
      return NextResponse.json({ error: '記録が見つかりません' }, { status: 404 });
    }

    // トランザクションで「在庫払い戻し」→「VisitRecord削除」を一括実行
    await db.$transaction(async (tx) => {
      // 1. 各商品の在庫を払い戻し（quantity 分だけ currentStock を増加）
      for (const item of visitRecord.items) {
        if (item.quantity !== 0) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              currentStock: {
                increment: item.quantity,
              },
            },
          });
        }
      }

      // 2. VisitRecordItem を削除（Prismaの cascade 設定によっては自動削除されるが念のため）
      await tx.visitRecordItem.deleteMany({ where: { visitRecordId: id } });

      // 3. VisitRecord を削除
      await tx.visitRecord.delete({ where: { id } });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete visit record:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
