'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Download,
  X,
  CheckCircle2
} from 'lucide-react';
import { formatFloat } from '@/lib/utils';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[0]}年${parts[1]}月${parts[2]}日`;
  }
  return dateStr;
};

export default function TenantCalendar() {
  const params = useParams();
  const tenantId = params?.tenantId as string;
  const router = useRouter();

  const [calendarData, setCalendarData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // 来店完了モーダル用
  const [visitModalCustomer, setVisitModalCustomer] = useState<any | null>(null);
  const [visitActualItems, setVisitActualItems] = useState<{ productId: string; quantity: number }[]>([]);
  const [visitNextInterval, setVisitNextInterval] = useState<number>(14);

  const fetchCalendar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${tenantId}/calendar?weekOffset=${weekOffset}`);
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      setCalendarData(data);
    } catch (err) {
      console.error('Failed to load calendar:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tenantId) {
      fetchCalendar();
    }
  }, [tenantId, weekOffset]);

  // 来店完了モーダルを開く
  const openVisitModal = (visit: any) => {
    // 顧客詳細をロード
    setVisitModalCustomer({
      customerId: visit.customerId,
      customerName: visit.customerName,
      visitInterval: 14, // デフォルト
      requirements: visit.requirements.map((r: any) => ({
        productId: r.productId || '',
        productName: r.productName,
        quantity: r.quantity,
      })),
    });

    // 実際の顧客設定を取得するためにfetchする
    fetch(`/api/${tenantId}/customers`)
      .then((res) => res.json())
      .then((customers) => {
        const found = customers.find((c: any) => c.id === visit.customerId);
        if (found) {
          setVisitModalCustomer({
            customerId: found.id,
            customerName: found.name,
            visitInterval: found.visitInterval,
            requirements: found.requirements.map((r: any) => ({
              productId: r.productId,
              productName: r.product.name,
              quantity: r.quantity,
            })),
          });
          setVisitNextInterval(found.visitInterval);
          setVisitActualItems(
            found.requirements.map((r: any) => ({
              productId: r.productId,
              quantity: r.quantity,
            }))
          );
        }
      });

    setVisitNextInterval(14);
    setVisitActualItems(
      visit.requirements.map((r: any) => ({
        productId: r.productId || '',
        quantity: r.quantity,
      }))
    );
  };

  // 来店完了処理の送信
  const handleVisitCompleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitModalCustomer) return;
    setActionLoading(`visit-${visitModalCustomer.customerId}`);
    try {
      const res = await fetch(`/api/${tenantId}/customers/visit-complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: visitModalCustomer.customerId,
          actualItems: visitActualItems,
          nextVisitInterval: Number(visitNextInterval),
        }),
      });
      if (res.ok) {
        setVisitModalCustomer(null);
        await fetchCalendar();
      } else {
        alert('来店処理に失敗しました。');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // スケジュールCSV出力
  const handleExportScheduleToCsv = () => {
    if (!calendarData?.visits) return;
    let csvContent = '\uFEFF';
    csvContent += '顧客名,来店予定日,希望商品一覧\n';
    
    calendarData.visits.forEach((c: any) => {
      const escapedName = c.customerName.includes(',') || c.customerName.includes('"') 
        ? `"${c.customerName.replace(/"/g, '""')}"` 
        : c.customerName;
      
      const reqsStr = c.requirements
        .map((r: any) => `${r.productName}(x${formatFloat(r.quantity)})`)
        .join('; ');
      const escapedReqsStr = reqsStr.includes(',') || reqsStr.includes('"') || reqsStr.includes(';')
        ? `"${reqsStr.replace(/"/g, '""')}"`
        : reqsStr;

      csvContent += `${escapedName},${c.visitDate},${escapedReqsStr}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `来店スケジュール_${calendarData.startDate}_${calendarData.endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // カレンダーの日付生成 (日曜始まり・5週間)
  const getCalendarDays = () => {
    if (!calendarData?.startDate) return [];
    const start = new Date(calendarData.startDate);
    // 35日分
    const days = [];
    for (let i = 0; i < 35; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const calendarDays = getCalendarDays();
  const todayStr = new Date().toISOString().split('T')[0];

  if (loading && !calendarData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-100">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium tracking-wide">カレンダーデータを読み込んでいます...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* 操作ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-lg">日曜始まりスケジュールカレンダー</h3>
            <p className="text-xs text-slate-400">
              表示期間: {calendarData?.startDate ? formatDate(calendarData.startDate) : ''} 〜 {calendarData?.endDate ? formatDate(calendarData.endDate) : ''}
            </p>
          </div>
        </div>

        {/* 週ナビゲーション */}
        <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl gap-1 self-start sm:self-center">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="前の週へ"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setWeekOffset(0)}
            className="px-3 py-1.5 hover:bg-slate-900 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            今週に戻る
          </button>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="次の週へ"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportScheduleToCsv}
            className="flex items-center gap-1.5 bg-indigo-650 hover:bg-indigo-550 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            CSV出力
          </button>
          <div className="text-xs text-slate-400 font-medium">
            現在オフセット: <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">{weekOffset} 週</span>
          </div>
        </div>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
        <div className="text-rose-400 py-2">日</div>
        <div className="py-2">月</div>
        <div className="py-2">火</div>
        <div className="py-2">水</div>
        <div className="py-2">木</div>
        <div className="py-2">金</div>
        <div className="text-blue-400 py-2">土</div>
      </div>

      {/* カレンダーグリッド */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, idx) => {
          const dateStr = day.toISOString().split('T')[0];
          const isToday = dateStr === todayStr;

          // この日の来店顧客を抽出
          const dayVisits = calendarData?.visits?.filter((v: any) => v.visitDate === dateStr) || [];

          return (
            <div
              key={idx}
              className={`min-h-[110px] p-2.5 rounded-xl border flex flex-col justify-between transition-all ${
                isToday
                  ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/30'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* 日付ヘッダー */}
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-xs font-bold ${
                    isToday
                      ? 'bg-indigo-500 text-white w-5 h-5 flex items-center justify-center rounded-full'
                      : day.getDay() === 0
                      ? 'text-rose-400'
                      : day.getDay() === 6
                      ? 'text-blue-400'
                      : 'text-slate-300'
                  }`}
                >
                  {day.getDate()}
                </span>
                {isToday && (
                  <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.2 rounded border border-indigo-500/30">
                    本日
                  </span>
                )}
              </div>

              {/* 顧客予定リスト */}
              <div className="flex-grow space-y-1 overflow-y-auto max-h-[70px] pr-0.5 custom-scrollbar">
                {dayVisits.map((visit: any, vIdx: number) => (
                  <div
                    key={vIdx}
                    onClick={() => openVisitModal(visit)}
                    className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850/60 transition-all rounded p-1 text-[10px] cursor-pointer group text-left"
                  >
                    <div className="font-bold text-slate-200 group-hover:text-indigo-300 truncate">
                      {visit.customerName}
                    </div>
                    {visit.requirements.length > 0 && (
                      <div className="text-slate-500 truncate scale-90 origin-left">
                        {visit.requirements.map((r: any) => `${r.productName}x${formatFloat(r.quantity)}`).join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 来店完了モーダル */}
      {visitModalCustomer && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative">
            <button
              onClick={() => setVisitModalCustomer(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                来店処理: {visitModalCustomer.customerName}
              </h3>
              <p className="text-xs text-slate-400 mt-1">実売数量を確定して在庫数を減算し、来店実績を記録します。</p>
            </div>

            <form onSubmit={handleVisitCompleteSubmit}>
              <div className="p-6 space-y-6 max-h-[40vh] overflow-y-auto custom-scrollbar">
                {/* 実売数量の入力 */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">購入商品と数量の調整</h4>
                  {visitActualItems.length === 0 ? (
                    <p className="text-slate-500 text-xs italic">希望商品はありません。</p>
                  ) : (
                    <div className="space-y-3">
                      {visitActualItems.map((item, idx) => {
                        const originalReq = visitModalCustomer.requirements.find(
                          (r: any) => r.productId === item.productId
                        );
                        return (
                          <div key={idx} className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between gap-4">
                            <span className="font-semibold text-sm text-slate-200 truncate">{originalReq?.productName}</span>
                            <div className="flex items-center gap-2">
                              <label className="text-[10px] text-slate-500">数量:</label>
                              <input
                                type="number"
                                step="0.01"
                                required
                                value={item.quantity}
                                onChange={(e) => {
                                  const updated = [...visitActualItems];
                                  updated[idx].quantity = parseFloat(e.target.value) || 0;
                                  setVisitActualItems(updated);
                                }}
                                className="w-20 bg-slate-900 border border-slate-800 text-center rounded-lg py-1 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 次回周期の入力 */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">次回来店周期の変更</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      required
                      min="0"
                      value={visitNextInterval}
                      onChange={(e) => setVisitNextInterval(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                    />
                    <span className="text-sm text-slate-400 font-medium shrink-0">日周期</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    ※ 周期を「0」に設定すると「来店不要（非アクティブ）」となり、カレンダーや需要予測から完全に除外されます。
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setVisitModalCustomer(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={!!actionLoading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all active:scale-98 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  来店完了を登録
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
