import { PrismaClient } from '@/generated/tenant-client';

/**
 * 基準日（今日の00:00:00 UTC）を返す
 */
export function getBaseDate(): Date {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  return now;
}

export const BASE_DATE = getBaseDate();

/**
 * visitInterval = 0 は「来店不要（非アクティブ）」を意味する
 * カレンダー表示・在庫予測計算から除外する
 */
export function isActiveCustomer(visitInterval: number): boolean {
  return visitInterval > 0;
}

/**
 * 指定された基準日から、来店周期に基づいて次回来店予定日を計算する
 * @param visitInterval 来店周期（日）。0の場合は計算しない
 * @param lastVisitDate 最終来店日（周期計算の起点）。nullの場合は今日から
 */
export function calculateNextVisitDate(
  visitInterval: number,
  lastVisitDate?: Date | null
): Date {
  if (visitInterval <= 0) {
    // 非アクティブ: 遠い未来の日付を返す（DBの型要件を満たすため）
    return new Date('2099-12-31T00:00:00Z');
  }
  const base = lastVisitDate ? new Date(lastVisitDate) : getBaseDate();
  base.setUTCHours(0, 0, 0, 0);
  base.setDate(base.getDate() + visitInterval);
  return base;
}

export interface ProductForecast {
  id: string;
  name: string;
  unit: string | null;
  currentStock: number;
  totalDemand: number;
  remainingStock: number;
  isDeficit: boolean;
}

/**
 * 指定期間内（基準日〜基準日+days）の需要を算出し、在庫不足を判定する
 * - visitInterval = 0 の顧客は計算から除外
 * - lastVisitDate がある場合はそれを起点に周期を繰り返してシミュレート
 * - currentStock / quantity は Float
 *
 * @param db テナント専用PrismaClient
 * @param days 予測期間（日数）
 */
export async function calculateDemandForecast(
  db: PrismaClient,
  days: number
): Promise<ProductForecast[]> {
  const startDate = getBaseDate();
  const endDate = getBaseDate();
  endDate.setDate(endDate.getDate() + days);

  const products = await db.product.findMany({
    include: {
      requirements: {
        include: {
          customer: true,
        },
      },
    },
  });

  const forecasts: ProductForecast[] = [];

  for (const product of products) {
    let totalDemand = 0;

    for (const req of product.requirements) {
      const customer = req.customer;
      const interval = customer.visitInterval;

      // visitInterval = 0 は来店不要 → スキップ
      if (!isActiveCustomer(interval)) continue;

      // 来店予定をシミュレート
      // lastVisitDate がある場合はそれを起点に繰り返す
      // ない場合は nextVisitDate を起点にする
      let tempVisitDate: Date;

      if (customer.lastVisitDate) {
        // 最終来店日 + 周期N回分を計算して予測期間内の来店を探す
        tempVisitDate = new Date(customer.lastVisitDate);
        tempVisitDate.setUTCHours(0, 0, 0, 0);
        // 最終来店日が今日より古い場合、今日以降まで進める
        while (tempVisitDate < startDate) {
          tempVisitDate = new Date(tempVisitDate);
          tempVisitDate.setDate(tempVisitDate.getDate() + interval);
        }
      } else {
        tempVisitDate = new Date(customer.nextVisitDate);
        tempVisitDate.setUTCHours(0, 0, 0, 0);
        if (tempVisitDate < startDate) {
          tempVisitDate = new Date(startDate);
        }
      }

      // 予測終了日までの来店をカウント
      while (tempVisitDate <= endDate) {
        if (tempVisitDate >= startDate) {
          totalDemand += req.quantity;
        }
        tempVisitDate = new Date(tempVisitDate);
        tempVisitDate.setDate(tempVisitDate.getDate() + interval);
      }
    }

    const remainingStock = product.currentStock - totalDemand;
    forecasts.push({
      id: product.id,
      name: product.name,
      unit: product.unit ?? null,
      currentStock: product.currentStock,
      totalDemand,
      remainingStock,
      isDeficit: remainingStock < 0,
    });
  }

  return forecasts;
}

export interface DeadStockProduct {
  id: string;
  name: string;
  unit: string | null;
  currentStock: number;
}

/**
 * 半年先（180日間）まで使用予定のない不動在庫をリストアップ
 * visitInterval=0 の顧客は除外済みのため、在庫>0 かつ需要=0 のもの
 */
export async function getDeadStock(db: PrismaClient): Promise<DeadStockProduct[]> {
  const forecasts = await calculateDemandForecast(db, 180);
  return forecasts
    .filter((f) => f.currentStock > 0 && f.totalDemand === 0)
    .map((f) => ({ id: f.id, name: f.name, unit: f.unit, currentStock: f.currentStock }));
}

/**
 * カレンダー表示用: 指定期間内に来店予定がある顧客とその日付を返す
 * visitInterval = 0 の顧客はスキップ
 * lastVisitDate 起点で周期を繰り返す
 *
 * @param db テナント専用PrismaClient
 * @param startDate 表示開始日
 * @param endDate 表示終了日
 */
export interface CalendarVisit {
  customerId: string;
  customerName: string;
  visitDate: string; // YYYY-MM-DD
  requirements: { productId: string; productName: string; quantity: number }[];
}

export async function getCalendarVisits(
  db: PrismaClient,
  startDate: Date,
  endDate: Date
): Promise<CalendarVisit[]> {
  const customers = await db.customer.findMany({
    include: {
      requirements: {
        include: { product: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  const visits: CalendarVisit[] = [];
  const start = new Date(startDate);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setUTCHours(23, 59, 59, 999);

  for (const customer of customers) {
    const interval = customer.visitInterval;

    // visitInterval = 0 は来店不要 → スキップ
    if (!isActiveCustomer(interval)) continue;

    // 来店日の繰り返し計算
    let tempDate: Date;
    if (customer.lastVisitDate) {
      tempDate = new Date(customer.lastVisitDate);
      tempDate.setUTCHours(0, 0, 0, 0);
      // start より前まで進める
      while (tempDate < start) {
        tempDate = new Date(tempDate);
        tempDate.setDate(tempDate.getDate() + interval);
      }
    } else {
      tempDate = new Date(customer.nextVisitDate);
      tempDate.setUTCHours(0, 0, 0, 0);
      // 過去の場合は最初の未来日付まで進める
      if (tempDate < start) {
        // startまで巻き上げる
        while (tempDate < start) {
          tempDate = new Date(tempDate);
          tempDate.setDate(tempDate.getDate() + interval);
        }
      }
    }

    // 表示期間内の全来店日を追加
    while (tempDate <= end) {
      const dateStr = tempDate.toISOString().split('T')[0];
      visits.push({
        customerId: customer.id,
        customerName: customer.name,
        visitDate: dateStr,
        requirements: customer.requirements.map((r) => ({
          productId: r.productId,
          productName: r.product.name,
          quantity: r.quantity,
        })),
      });
      tempDate = new Date(tempDate);
      tempDate.setDate(tempDate.getDate() + interval);
    }
  }

  return visits;
}
