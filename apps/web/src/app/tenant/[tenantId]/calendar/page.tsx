'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Download,
  X,
  CheckCircle2,
  Plus,
  Trash2,
  GripVertical,
  Lock
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

  // 来店完了モーダル用（今回使用量 + 次回使用予定量）
  const [visitModalCustomer, setVisitModalCustomer] = useState<any | null>(null);
  const [visitActualItems, setVisitActualItems] = useState<{ productId: string; productName: string; usedQty: number; nextQty: number }[]>([]);
  const [visitNextInterval, setVisitNextInterval] = useState<number>(14);
  const [visitCompletedDate, setVisitCompletedDate] = useState<string>(''); // 来局完了日（YYYY-MM-DD）
  const [allProducts, setAllProducts] = useState<any[]>([]);
  // 追加薬品
  const [addMedProductId, setAddMedProductId] = useState('');
  const [addMedUsedQty, setAddMedUsedQty] = useState('0');
  const [addMedNextQty, setAddMedNextQty] = useState('1');
  // 希望商品ドラッグ（モーダル内）
  const [modalDraggedIndex, setModalDraggedIndex] = useState<number | null>(null);
  const [isModalTouchDragging, setIsModalTouchDragging] = useState(false);
  const modalTouchTimeoutRef = useRef<any>(null);

  // カレンダーDnD（来店日の移動）
  const [dragVisit, setDragVisit] = useState<any | null>(null);
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);
  const touchDragVisitRef = useRef<any>(null);
  const touchTimerRef = useRef<any>(null);
  const [isTouchDraggingVisit, setIsTouchDraggingVisit] = useState(false);

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

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/${tenantId}/products`);
      const data = await res.json();
      setAllProducts(data);
      if (data.length > 0) setAddMedProductId(data[0].id);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (tenantId) {
      fetchCalendar();
      fetchProducts();
    }
  }, [tenantId, weekOffset]);

  // 来店完了モーダルを開く
  const openVisitModal = (visit: any) => {
    // 完了済みカードはモーダルを開かない
    if (visit.isCompleted) return;

    // 来局完了日の初期値を「本日」に設定
    setVisitCompletedDate(todayStr);

    setVisitModalCustomer({
      customerId: visit.customerId,
      customerName: visit.customerName,
      visitInterval: visit.visitInterval || 14,
      requirements: visit.requirements.map((r: any) => ({
        productId: r.productId || '',
        productName: r.productName,
        quantity: r.quantity,
      })),
    });

    fetch(`/api/${tenantId}/customers/${visit.customerId}`)
      .then((res) => res.json())
      .then((customer) => {
        if (customer && !customer.error) {
          setVisitModalCustomer({
            customerId: customer.id,
            customerName: customer.name,
            visitInterval: customer.visitInterval,
            requirements: customer.requirements.map((r: any) => ({
              productId: r.productId,
              productName: r.product.name,
              quantity: r.quantity,
            })),
          });
          setVisitNextInterval(customer.visitInterval);
          setVisitActualItems(
            customer.requirements.map((r: any) => ({
              productId: r.productId,
              productName: r.product.name,
              usedQty: r.quantity,
              nextQty: r.quantity,
            }))
          );
        }
      })
      .catch((err) => console.error('Failed to fetch customer detail:', err));

    setVisitNextInterval(visit.visitInterval || 14);
    setVisitActualItems(
      visit.requirements.map((r: any) => ({
        productId: r.productId || '',
        productName: r.productName,
        usedQty: r.quantity,
        nextQty: r.quantity,
      }))
    );
  };

  // モーダル内の希望商品ドラッグ
  const handleModalDragStart = (index: number) => setModalDraggedIndex(index);
  const handleModalDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (modalDraggedIndex === null || modalDraggedIndex === index) return;
    const items = [...visitActualItems];
    const dragged = items[modalDraggedIndex];
    items.splice(modalDraggedIndex, 1);
    items.splice(index, 0, dragged);
    setModalDraggedIndex(index);
    setVisitActualItems(items);
  };
  const handleModalDragEnd = () => setModalDraggedIndex(null);

  // タッチによるモーダル内薬品並び替え（長押し）
  const handleModalTouchStart = (index: number) => {
    modalTouchTimeoutRef.current = setTimeout(() => {
      setIsModalTouchDragging(true);
      setModalDraggedIndex(index);
    }, 400); // 400ms long press to start dragging
  };

  const handleModalTouchMove = (e: React.TouchEvent) => {
    if (!isModalTouchDragging || modalDraggedIndex === null) {
      clearTimeout(modalTouchTimeoutRef.current);
      return;
    }
    if (e.cancelable) e.preventDefault();

    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return;

    const itemEl = element.closest('[data-modal-drag-index]');
    if (itemEl) {
      const overIndex = parseInt(itemEl.getAttribute('data-modal-drag-index') || '', 10);
      if (!isNaN(overIndex) && overIndex !== modalDraggedIndex) {
        const items = [...visitActualItems];
        const dragged = items[modalDraggedIndex];
        items.splice(modalDraggedIndex, 1);
        items.splice(overIndex, 0, dragged);
        setModalDraggedIndex(overIndex);
        setVisitActualItems(items);
      }
    }
  };

  const handleModalTouchEnd = () => {
    clearTimeout(modalTouchTimeoutRef.current);
    setIsModalTouchDragging(false);
    setModalDraggedIndex(null);
  };

  // 薬追加
  const handleAddMedicine = () => {
    if (!addMedProductId) return;
    const exists = visitActualItems.findIndex(i => i.productId === addMedProductId);
    const product = allProducts.find(p => p.id === addMedProductId);
    if (exists >= 0) {
      const updated = [...visitActualItems];
      updated[exists].usedQty += parseFloat(addMedUsedQty) || 0;
      updated[exists].nextQty += parseFloat(addMedNextQty) || 0;
      setVisitActualItems(updated);
    } else {
      setVisitActualItems([...visitActualItems, {
        productId: addMedProductId,
        productName: product?.name || '不明',
        usedQty: parseFloat(addMedUsedQty) || 0,
        nextQty: parseFloat(addMedNextQty) || 1,
      }]);
    }
    setAddMedUsedQty('0');
    setAddMedNextQty('1');
  };

  const handleRemoveMed = (productId: string) => {
    setVisitActualItems(visitActualItems.filter(i => i.productId !== productId));
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
          actualItems: visitActualItems.map(i => ({ productId: i.productId, quantity: i.usedQty })),
          nextItems: visitActualItems.map(i => ({ productId: i.productId, quantity: i.nextQty })),
          nextVisitInterval: Number(visitNextInterval),
          visitDate: visitCompletedDate || todayStr, // 来局完了日
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

  // カレンダーDnD: 来店日移動
  const handleVisitDragStart = (e: React.DragEvent, visit: any) => {
    setDragVisit(visit);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCellDragOver = (e: React.DragEvent, dateStr: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverDate !== dateStr) {
      setDragOverDate(dateStr);
    }
  };

  const handleCellDragLeave = () => {
    setDragOverDate(null);
  };

  const handleCellDrop = async (e: React.DragEvent, dateStr: string) => {
    e.preventDefault();
    setDragOverDate(null);
    if (!dragVisit || dragVisit.visitDate === dateStr) {
      setDragVisit(null);
      return;
    }
    await rescheduleVisit(dragVisit, dateStr);
    setDragVisit(null);
  };

  // タッチによる来店日移動（長押し）
  const handleVisitTouchStart = (visit: any) => {
    touchTimerRef.current = setTimeout(() => {
      setIsTouchDraggingVisit(true);
      touchDragVisitRef.current = visit;
    }, 500);
  };

  const handleVisitTouchMove = (e: React.TouchEvent) => {
    if (!isTouchDraggingVisit) {
      clearTimeout(touchTimerRef.current);
      return;
    }
    if (e.cancelable) e.preventDefault();
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!el) return;
    const cell = el.closest('[data-calendar-date]');
    if (cell) {
      const targetDate = cell.getAttribute('data-calendar-date');
      if (dragOverDate !== targetDate) {
        setDragOverDate(targetDate);
      }
    }
  };

  const handleVisitTouchEnd = async () => {
    clearTimeout(touchTimerRef.current);
    if (isTouchDraggingVisit && touchDragVisitRef.current && dragOverDate) {
      if (touchDragVisitRef.current.visitDate !== dragOverDate) {
        await rescheduleVisit(touchDragVisitRef.current, dragOverDate);
      }
    }
    setIsTouchDraggingVisit(false);
    touchDragVisitRef.current = null;
    setDragOverDate(null);
  };

  // 来店日の実際の変更処理（nextVisitDate のみを直接書き換える ＝ 過去実績は動かない）
  const rescheduleVisit = async (visit: any, newDateStr: string) => {
    setActionLoading(`reschedule-${visit.customerId}`);
    try {
      const res = await fetch(`/api/${tenantId}/customers/${visit.customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nextVisitDate: newDateStr, // nextVisitDate のみ更新。lastVisitDate は変更しない
        }),
      });
      if (res.ok) {
        await fetchCalendar();
      } else {
        alert('日程変更に失敗しました。');
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
        .map((r: any) => `${r.productName}(x${formatFloat(r.quantity)})`).join('; ');
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

  const getCalendarDays = () => {
    if (!calendarData?.startDate) return [];
    const start = new Date(calendarData.startDate);
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

  // マウスホイール / タッチパッドスクロールで週を移動
  const wheelTimerRef = useRef<any>(null);
  const handleCalendarWheel = (e: React.WheelEvent) => {
    // モーダルが開いている時はスクロール操作を無視
    if (visitModalCustomer) return;
    e.preventDefault();
    clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = setTimeout(() => {
      if (e.deltaY > 0) {
        setWeekOffset(prev => prev + 1); // 下スクロール → 翌週
      } else if (e.deltaY < 0) {
        setWeekOffset(prev => prev - 1); // 上スクロール → 前週
      }
    }, 50);
  };

  return (
    <div
      className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6"
      onWheel={handleCalendarWheel}
    >
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
              <span className="ml-2 text-indigo-400/60">※ 顧客カードを長押しでドラッグして別の日に移動できます</span>
            </p>
          </div>
        </div>

        <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl gap-1 self-start sm:self-center">
          <button onClick={() => setWeekOffset(weekOffset - 1)} className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer" title="前の週へ">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setWeekOffset(0)} className="px-3 py-1.5 hover:bg-slate-900 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer">
            今週に戻る
          </button>
          <button onClick={() => setWeekOffset(weekOffset + 1)} className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer" title="次の週へ">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleExportScheduleToCsv} className="flex items-center gap-1.5 bg-indigo-650 hover:bg-indigo-550 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            CSV出力
          </button>
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
        {(() => {
          // Group visits by date for O(1) rendering lookup to avoid performance lag
          const visitsByDate = calendarData?.visits?.reduce((acc: any, v: any) => {
            if (!acc[v.visitDate]) {
              acc[v.visitDate] = [];
            }
            acc[v.visitDate].push(v);
            return acc;
          }, {}) || {};

          return calendarDays.map((day, idx) => {
            const dateStr = day.toISOString().split('T')[0];
            const isToday = dateStr === todayStr;
            const isDragTarget = dragOverDate === dateStr;
            const dayVisits = visitsByDate[dateStr] || [];

          return (
            <div
              key={idx}
              data-calendar-date={dateStr}
              onDragOver={(e) => handleCellDragOver(e, dateStr)}
              onDragLeave={handleCellDragLeave}
              onDrop={(e) => handleCellDrop(e, dateStr)}
              className={`min-h-[110px] p-2.5 rounded-xl border flex flex-col justify-between transition-all ${
                isDragTarget
                  ? 'bg-indigo-900/40 border-indigo-400 ring-1 ring-indigo-400/50 scale-[1.02]'
                  : isToday
                  ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/30'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* 日付ヘッダー */}
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold ${
                  isToday
                    ? 'bg-indigo-500 text-white w-5 h-5 flex items-center justify-center rounded-full'
                    : day.getDay() === 0
                    ? 'text-rose-400'
                    : day.getDay() === 6
                    ? 'text-blue-400'
                    : 'text-slate-300'
                }`}>
                  {day.getDate()}
                </span>
                {isToday && (
                  <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.2 rounded border border-indigo-500/30">本日</span>
                )}
              </div>

              {/* 顧客予定リスト */}
              <div className="flex-grow space-y-1 overflow-y-auto max-h-[80px] pr-0.5 custom-scrollbar">
                {dayVisits.map((visit: any, vIdx: number) => {
                  const isCompleted = !!visit.isCompleted;
                  const isDraggingThis = dragVisit?.customerId === visit.customerId && dragVisit?.visitDate === visit.visitDate;
                  const isTouchActive = isTouchDraggingVisit && touchDragVisitRef.current?.customerId === visit.customerId && touchDragVisitRef.current?.visitDate === visit.visitDate;
                  return (
                    <div
                      key={vIdx}
                      draggable={!isCompleted}
                      onDragStart={(e) => !isCompleted && handleVisitDragStart(e, visit)}
                      onDragEnd={() => setDragVisit(null)}
                      onTouchStart={() => !isCompleted && handleVisitTouchStart(visit)}
                      onTouchMove={handleVisitTouchMove}
                      onTouchEnd={handleVisitTouchEnd}
                      onClick={() => !isTouchDraggingVisit && openVisitModal(visit)}
                      className={`border rounded p-1 text-[10px] text-left select-none transition-all ${
                        isCompleted
                          ? 'bg-slate-800/40 border-slate-700/50 opacity-60 cursor-default'
                          : isDraggingThis || isTouchActive
                          ? 'bg-indigo-900/60 border-yellow-400 ring-1 ring-yellow-400/60 scale-95 shadow-lg cursor-grabbing opacity-70'
                          : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850/60 cursor-grab group'
                      }`}
                    >
                      <div className="flex items-center gap-0.5">
                        {isCompleted
                          ? <Lock className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                          : <GripVertical className="w-2.5 h-2.5 text-slate-600 shrink-0 group-hover:text-indigo-400" />
                        }
                        <div className={`font-bold truncate ${
                          isCompleted ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-indigo-300'
                        }`}>{visit.customerName}</div>
                        {isCompleted && (
                          <span className="ml-auto shrink-0 text-[8px] bg-slate-700/80 text-slate-400 px-1 rounded">完了</span>
                        )}
                      </div>
                      {visit.requirements.length > 0 && (
                        <div className={`truncate scale-90 origin-left ${
                          isCompleted ? 'text-slate-600' : 'text-slate-500'
                        }`}>
                          {visit.requirements.map((r: any) => `${r.productName}x${formatFloat(r.quantity)}`).join(', ')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })})()}
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
              <p className="text-xs text-slate-400 mt-1">今回使用量を確定して在庫を減算。次回予定量を登録します。</p>
            </div>

            {/* 来局完了日セクション（モーダルヘッダー直下） */}
            <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800 flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">来局完了日</span>
              <input
                type="date"
                value={visitCompletedDate}
                max={todayStr}
                onChange={(e) => setVisitCompletedDate(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              />
              {visitCompletedDate !== todayStr && (
                <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                  過去日付で登録
                </span>
              )}
            </div>

            <form onSubmit={handleVisitCompleteSubmit}>
              <div className="p-6 space-y-5 max-h-[55vh] overflow-y-auto custom-scrollbar">

                {/* 購入商品リスト（ドラッグ並び替え対応） */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <GripVertical className="w-3.5 h-3.5" />
                    医薬品リスト（長押しで並び替え）
                  </h4>
                  {visitActualItems.length === 0 ? (
                    <p className="text-slate-500 text-xs italic">希望商品はありません。下の「追加」から薬を追加してください。</p>
                  ) : (
                    <div className="space-y-2">
                      {/* ヘッダー行 */}
                      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
                        <div className="w-4"></div>
                        <div>商品名</div>
                        <div className="text-center w-16">今回使用</div>
                        <div className="text-center w-16">次回予定</div>
                        <div className="w-5"></div>
                      </div>
                      {visitActualItems.map((item, idx) => {
                        const isDraggingThis = modalDraggedIndex === idx;
                        return (
                          <div
                            key={item.productId}
                            data-modal-drag-index={idx}
                            draggable="true"
                            onDragStart={() => handleModalDragStart(idx)}
                            onDragOver={(e) => handleModalDragOver(e, idx)}
                            onDragEnd={handleModalDragEnd}
                            onTouchStart={() => handleModalTouchStart(idx)}
                            onTouchMove={handleModalTouchMove}
                            onTouchEnd={handleModalTouchEnd}
                            className={`bg-slate-950/40 border rounded-xl px-3 py-2 grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-2 select-none transition-all ${
                              isDraggingThis ? 'opacity-40 border-indigo-500' : 'border-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            <div className="text-slate-500 cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-semibold text-xs text-slate-200 truncate">{item.productName}</span>
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="text-[9px] text-slate-500">今回</span>
                              <input
                                type="number"
                                step="0.01"
                                value={item.usedQty}
                                onChange={(e) => {
                                  const updated = [...visitActualItems];
                                  updated[idx].usedQty = parseFloat(e.target.value) || 0;
                                  setVisitActualItems(updated);
                                }}
                                className="w-16 bg-slate-900 border border-slate-800 text-center rounded-lg py-1 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="text-[9px] text-indigo-400">次回</span>
                              <input
                                type="number"
                                step="0.01"
                                value={item.nextQty}
                                onChange={(e) => {
                                  const updated = [...visitActualItems];
                                  updated[idx].nextQty = parseFloat(e.target.value) || 0;
                                  setVisitActualItems(updated);
                                }}
                                className="w-16 bg-slate-900 border border-indigo-900/50 text-center rounded-lg py-1 text-xs font-semibold text-indigo-300 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveMed(item.productId)}
                              className="text-slate-500 hover:text-rose-400 p-0.5 rounded transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 薬品追加セクション */}
                <div className="border-t border-slate-800 pt-4 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-emerald-400" />
                    今回処方された薬を追加
                  </h4>
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className="text-[10px] text-slate-500 block mb-1">薬品</label>
                      <select
                        value={addMedProductId}
                        onChange={(e) => setAddMedProductId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        {allProducts.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">今回</label>
                      <input
                        type="number" step="0.01"
                        value={addMedUsedQty}
                        onChange={(e) => setAddMedUsedQty(e.target.value)}
                        className="w-14 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white text-center focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-indigo-400 block mb-1">次回</label>
                      <input
                        type="number" step="0.01"
                        value={addMedNextQty}
                        onChange={(e) => setAddMedNextQty(e.target.value)}
                        className="w-14 bg-slate-950 border border-indigo-900/40 rounded-lg px-2 py-1.5 text-xs text-indigo-300 text-center focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMedicine}
                      className="bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      追加
                    </button>
                  </div>
                </div>

                {/* 次回周期の入力 */}
                <div className="space-y-2 border-t border-slate-800 pt-4">
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
                    ※ 周期を「0」に設定すると「来店不要（非アクティブ）」となります。
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
