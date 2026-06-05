import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { getTenantDb } from '@/lib/tenant-db';
import { calculateNextVisitDate } from '@/lib/forecast';

/**
 * 顧客CSVの一括インポート（商品紐付け対応版）
 *
 * CSVフォーマット（ヘッダー行あり）:
 *   名前,来店周期(日),最終来店日(任意),希望商品一覧(任意)
 *
 * 希望商品一覧の書式:
 *   商品名1:数量1;商品名2:数量2
 *   例) アムロジピン錠5mg:2;ロキソプロフェンNa錠60mg:1
 *
 * - 商品名はテナントの商品マスタと完全一致が必要
 * - 数量は小数点対応 (例: 0.5)
 * - 第4カラムが空の場合は顧客のみ登録（商品紐付けなし）
 * - 一致しない商品名はスキップしてエラー詳細に記録する
 *
 * 例:
 *   山田太郎,14,2026-05-25,アムロジピン錠5mg:2;ロキソプロフェンNa錠60mg:1
 *   鈴木花子,0,,
 */

/** 希望商品の1件分 */
interface ParsedRequirement {
  productName: string;
  quantity: number;
}

/**
 * 希望商品カラムをパースする
 * 例: "アムロジピン錠5mg:2;ロキソプロフェンNa錠60mg:1"
 *  → [{ productName: 'アムロジピン錠5mg', quantity: 2 }, ...]
 */
function parseRequirementsColumn(col: string): ParsedRequirement[] {
  if (!col || !col.trim()) return [];

  return col
    .split(';')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .map((entry) => {
      // 最後のコロンで分割（商品名にコロンが含まれる場合に対応）
      const lastColon = entry.lastIndexOf(':');
      if (lastColon === -1) return null;

      const productName = entry.slice(0, lastColon).trim();
      const quantityStr = entry.slice(lastColon + 1).trim();
      const quantity = parseFloat(quantityStr);

      if (!productName || isNaN(quantity) || quantity <= 0) return null;
      return { productName, quantity };
    })
    .filter((r): r is ParsedRequirement => r !== null);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  try {
    const { tenantId } = await params;
    const session = await getSession();
    if (!session.isLoggedIn)
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const tenant = await resolveTenant(tenantId);
    if (!tenant)
      return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

    const { csvText } = await request.json();
    if (!csvText || typeof csvText !== 'string') {
      return NextResponse.json({ error: 'CSV text is required' }, { status: 400 });
    }

    const lines = csvText
      .trim()
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 2) {
      return NextResponse.json(
        { error: 'CSV must have at least a header row and one data row' },
        { status: 400 }
      );
    }

    const dataLines = lines.slice(1);
    const results: { success: number; errors: string[]; warnings: string[] } = {
      success: 0,
      errors: [],
      warnings: [],
    };
    const db = getTenantDb(tenant.id);

    // 商品マスタを事前に全件取得してMapに格納（行ごとのDBアクセスを避ける）
    const allProducts = await db.product.findMany({
      select: { id: true, name: true },
    });
    const productMap = new Map<string, string>(
      allProducts.map((p) => [p.name, p.id])
    );

    for (let i = 0; i < dataLines.length; i++) {
      const lineNum = i + 2; // ヘッダー行分 +1、1-indexed +1
      const line = dataLines[i];

      // カンマ区切りでパース（ダブルクォート対応）
      // 第4カラム（希望商品）にセミコロンが含まれているためシンプルに先頭3カラムを切り出す
      const csvCols = line
        .split(',')
        .map((c) => c.trim().replace(/^"(.*)"$/, '$1'));

      if (csvCols.length < 2) {
        results.errors.push(`行 ${lineNum}: カラム数が不足しています`);
        continue;
      }

      // 第4カラムは先頭3カラムを取り出した残りを結合（商品名にカンマが含まれる場合の対応）
      const [name, intervalStr, lastVisitStr, ...restCols] = csvCols;
      const requirementsRaw = restCols.join(','); // 残りを再結合

      // 名前チェック
      if (!name) {
        results.errors.push(`行 ${lineNum}: 名前が空です`);
        continue;
      }

      // 来店周期チェック
      const visitInterval = parseInt(intervalStr, 10);
      if (isNaN(visitInterval) || visitInterval < 0) {
        results.errors.push(
          `行 ${lineNum}: 来店周期が無効です (${intervalStr})`
        );
        continue;
      }

      // 最終来店日パース（任意）
      let lastVisitDate: Date | null = null;
      if (lastVisitStr && lastVisitStr.trim()) {
        const parsedDate = new Date(lastVisitStr.trim());
        if (!isNaN(parsedDate.getTime())) {
          lastVisitDate = parsedDate;
        }
      }

      // 次回来店予定日を計算
      const nextVisitDate = calculateNextVisitDate(visitInterval, lastVisitDate);

      // 希望商品カラムをパース
      const parsedReqs = parseRequirementsColumn(requirementsRaw);

      // 商品名 → ID の解決（マスタに存在しない商品はwarningに記録しスキップ）
      const resolvedReqs: { productId: string; quantity: number }[] = [];
      for (const req of parsedReqs) {
        const productId = productMap.get(req.productName);
        if (!productId) {
          results.warnings.push(
            `行 ${lineNum} (${name}): 商品「${req.productName}」は商品マスタに存在しないためスキップしました`
          );
        } else {
          resolvedReqs.push({ productId, quantity: req.quantity });
        }
      }

      // トランザクションで顧客作成 + 商品紐付けを一括登録
      try {
        await db.$transaction(async (tx) => {
          // 顧客を作成
          const customer = await tx.customer.create({
            data: {
              name,
              visitInterval,
              lastVisitDate,
              nextVisitDate,
            },
          });

          // 希望商品の紐付けを一括登録（存在する場合のみ）
          if (resolvedReqs.length > 0) {
            await tx.customerRequirement.createMany({
              data: resolvedReqs.map((r) => ({
                customerId: customer.id,
                productId: r.productId,
                quantity: r.quantity,
              })),
              // skipDuplicates: true,
            });
          }
        });

        results.success++;
      } catch (err) {
        results.errors.push(`行 ${lineNum}: 登録失敗 (${name})`);
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Failed to import customers CSV:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
