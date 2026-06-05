import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';
import { calculateNextVisitDate, getBaseDate } from '@/lib/forecast';

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

    const {
      customerId,
      actualItems,
      nextVisitInterval,
    }: {
      customerId: string;
      actualItems?: { productId: string; quantity: number }[];
      nextVisitInterval?: number;
    } = await request.json();

    if (!customerId) {
      return NextResponse.json({ error: 'Missing customer ID' }, { status: 400 });
    }

    const db = getTenantDb(tenant.id);

    const customer = await db.customer.findUnique({
      where: { id: customerId },
      include: {
        requirements: true,
      },
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // 次回予定周期の確定（入力があれば上書き、なければ既存）
    const effectiveInterval = typeof nextVisitInterval === 'number'
      ? nextVisitInterval
      : customer.visitInterval;

    const today = getBaseDate();

    // 次回予定日の計算
    const newNextVisitDate = calculateNextVisitDate(effectiveInterval, today);

    // 在庫差し引きに使う実売データを確定
    const itemsToDeduct = actualItems && actualItems.length > 0
      ? actualItems
      : customer.requirements.map(r => ({ productId: r.productId, quantity: r.quantity }));

    // トランザクション処理
    await db.$transaction(async (tx) => {
      // 1. 来店周期・最終来店日・次回予定日を更新
      await tx.customer.update({
        where: { id: customerId },
        data: {
          lastVisitDate: today,
          nextVisitDate: newNextVisitDate,
          visitInterval: effectiveInterval,
        },
      });

      // 2. 次回予測購入量の更新（actualItemsが渡された場合のみ）
      if (actualItems && actualItems.length > 0) {
        for (const item of actualItems) {
          await tx.customerRequirement.upsert({
            where: {
              customerId_productId: {
                customerId,
                productId: item.productId,
              },
            },
            update: { quantity: item.quantity },
            create: {
              customerId,
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        }
      }

      // 3. 在庫を実売数量で差し引き（Float対応）
      for (const item of itemsToDeduct) {
        if (item.quantity !== 0) { // マイナス在庫対応のため、0以外の変動があれば差し引き
          await tx.product.update({
            where: { id: item.productId },
            data: {
              currentStock: {
                decrement: item.quantity,
              },
            },
          });
        }
      }

      // 4. 来店実績の記録（VisitRecord + VisitRecordItem）
      await tx.visitRecord.create({
        data: {
          customerId,
          visitedAt: today,
          items: {
            create: itemsToDeduct
              .filter(i => i.quantity !== 0)
              .map(item => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
      nextVisitDate: newNextVisitDate,
      effectiveInterval,
    });
  } catch (error) {
    console.error('Failed to complete visit:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
