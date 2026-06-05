import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';

/**
 * 商品CSVの一括インポート
 * CSVフォーマット（ヘッダー行あり）:
 * 商品名,現在庫数,単位(任意)
 * リンゴ,50.5,個
 * バナナ,-2.0,パック
 */
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

    const { csvText } = await request.json();
    if (!csvText || typeof csvText !== 'string') {
      return NextResponse.json({ error: 'CSV text is required' }, { status: 400 });
    }

    const lines = csvText.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);

    if (lines.length < 2) {
      return NextResponse.json({ error: 'CSV must have at least a header row and one data row' }, { status: 400 });
    }

    const dataLines = lines.slice(1);
    const results: { success: number; errors: string[] } = { success: 0, errors: [] };
    const db = getTenantDb(tenant.id);

    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i];
      const cols = line.split(',').map(c => c.trim().replace(/^"(.*)"$/, '$1'));

      if (cols.length < 2) {
        results.errors.push(`行 ${i + 2}: カラム数が不足しています (${line})`);
        continue;
      }

      const [name, stockStr, unit] = cols;

      if (!name) {
        results.errors.push(`行 ${i + 2}: 商品名が空です`);
        continue;
      }

      const currentStock = parseFloat(stockStr);
      if (isNaN(currentStock)) {
        results.errors.push(`行 ${i + 2}: 現在庫数が無効です (${stockStr})`);
        continue;
      }

      try {
        const existingProduct = await db.product.findFirst({
          where: { name },
        });

        if (existingProduct) {
          await db.product.update({
            where: { id: existingProduct.id },
            data: {
              currentStock,
              unit: unit || existingProduct.unit,
            },
          });
        } else {
          await db.product.create({
            data: {
              name,
              currentStock,
              unit: unit || null,
            },
          });
        }
        results.success++;
      } catch (err) {
        results.errors.push(`行 ${i + 2}: 登録失敗 (${name})`);
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Failed to import products CSV:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
