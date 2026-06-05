'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Users,
  Plus,
  Trash2,
  Loader2,
  Download,
  Upload,
  UserPlus,
  Clock,
  RefreshCw,
  FileText,
  Save,
  ChevronRight
} from 'lucide-react';
import { formatFloat } from '@/lib/utils';

export default function TenantCustomers() {
  const params = useParams();
  const tenantId = params?.tenantId as string;
  const router = useRouter();

  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // 顧客追加用
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerInterval, setNewCustomerInterval] = useState<string>('14');
  const [newCustomerLastVisit, setNewCustomerLastVisit] = useState('');

  // 紐付け・スケジュール編集（訂正）用
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedCustomerReqs, setSelectedCustomerReqs] = useState<{ productId: string; quantity: number }[]>([]);
  const [addReqProductId, setAddReqProductId] = useState('');
  const [addReqQuantity, setAddReqQuantity] = useState<string>('1');
  const [editVisitInterval, setEditVisitInterval] = useState<string>('14');
  const [editLastVisitDate, setEditLastVisitDate] = useState<string>('');

  // CSVインポート
  const [customerCsvText, setCustomerCsvText] = useState('');
  const [csvMessage, setCsvMessage] = useState<{ type: 'success' | 'error' | 'warning'; text: string; details?: string[] } | null>(null);
  const [isDragOverCustomer, setIsDragOverCustomer] = useState(false);
  const customerFileRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [custRes, prodRes] = await Promise.all([
        fetch(`/api/${tenantId}/customers`),
        fetch(`/api/${tenantId}/products`),
      ]);

      if (custRes.status === 401) {
        router.push('/login');
        return;
      }

      const custData = await custRes.json();
      const prodData = await prodRes.json();

      setCustomers(custData);
      setProducts(prodData);

      if (prodData.length > 0 && !addReqProductId) {
        setAddReqProductId(prodData[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tenantId) {
      fetchData();
    }
  }, [tenantId]);

  // 新規顧客追加
  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim()) return;
    setActionLoading('add-customer');
    try {
      const res = await fetch(`/api/${tenantId}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCustomerName,
          visitInterval: parseInt(newCustomerInterval, 10) || 0,
          lastVisitDate: newCustomerLastVisit || null,
        }),
      });
      if (res.ok) {
        setNewCustomerName('');
        setNewCustomerInterval('14');
        setNewCustomerLastVisit('');
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // 顧客削除
  const handleDeleteCustomer = async (id: string) => {
    if (!confirm('本当にこの顧客を削除しますか？')) return;
    setActionLoading(`delete-customer-${id}`);
    try {
      const res = await fetch(`/api/${tenantId}/customers/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        if (selectedCustomerId === id) setSelectedCustomerId(null);
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // 紐付け対象の顧客が選択されたとき
  const selectCustomerForReqs = (customer: any) => {
    setSelectedCustomerId(customer.id);
    setSelectedCustomerReqs(
      customer.requirements.map((r: any) => ({
        productId: r.productId,
        quantity: r.quantity,
      }))
    );
    setEditVisitInterval(String(customer.visitInterval));

    if (customer.lastVisitDate) {
      const d = new Date(customer.lastVisitDate);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      setEditLastVisitDate(`${yyyy}-${mm}-${dd}`);
    } else {
      setEditLastVisitDate('');
    }
  };

  // 紐付けの一時的な追加
  const handleAddReq = () => {
    if (!addReqProductId) return;
    const qty = parseFloat(addReqQuantity) || 1;
    const existsIndex = selectedCustomerReqs.findIndex(r => r.productId === addReqProductId);
    if (existsIndex >= 0) {
      const updated = [...selectedCustomerReqs];
      updated[existsIndex].quantity = parseFloat((updated[existsIndex].quantity + qty).toFixed(2));
      setSelectedCustomerReqs(updated);
    } else {
      setSelectedCustomerReqs([...selectedCustomerReqs, { productId: addReqProductId, quantity: qty }]);
    }
  };

  // 紐付けの訂正（数量変更）
  const handleUpdateReqQty = (productId: string, quantity: number) => {
    const updated = selectedCustomerReqs.map(r =>
      r.productId === productId ? { ...r, quantity: Math.max(0, quantity) } : r
    );
    setSelectedCustomerReqs(updated);
  };

  // 紐付けの削除
  const handleRemoveReq = (productId: string) => {
    setSelectedCustomerReqs(selectedCustomerReqs.filter(r => r.productId !== productId));
  };

  // 希望商品・スケジュールの保存
  const handleSaveReqs = async () => {
    if (!selectedCustomerId) return;
    setActionLoading('save-reqs');
    try {
      // 1. 希望商品の一括保存 (追加、訂正、削除をすべてマージ)
      const reqRes = await fetch(`/api/${tenantId}/customers/requirements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: selectedCustomerId,
          requirements: selectedCustomerReqs.filter(r => r.quantity > 0),
        }),
      });

      // 2. 来店スケジュール (最終来店日、周期) の保存
      const customerRes = await fetch(`/api/${tenantId}/customers/${selectedCustomerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitInterval: parseInt(editVisitInterval, 10) || 0,
          lastVisitDate: editLastVisitDate || null,
        }),
      });

      if (reqRes.ok && customerRes.ok) {
        await fetchData();
        alert('設定を保存しました。');
      } else {
        alert('設定の保存に失敗しました。');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // CSVインポート処理
  const processAndImportCsv = async (csvText: string) => {
    setCsvMessage(null);
    if (!csvText.trim()) return;

    const lines = csvText.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
      setCsvMessage({ type: 'error', text: 'CSVデータが空かヘッダーしかありません。' });
      return;
    }

    const header = lines[0].toLowerCase();
    const cols = header.split(',').map(c => c.trim().replace(/^"(.*)"$/, '$1'));

    const isValid = cols.length >= 2 &&
                    (cols[0].includes('名前') || cols[0].includes('name')) &&
                    (cols[1].includes('周期') || cols[1].includes('interval'));

    if (!isValid) {
      setCsvMessage({ type: 'error', text: 'CSVヘッダー形式が異なります。（名前,来店周期(日),最終来店日(任意),希望商品一覧(任意)）' });
      return;
    }

    setActionLoading('import-customers');
    try {
      const res = await fetch(`/api/${tenantId}/customers/csv-import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvText }),
      });
      const data = await res.json();
      if (res.ok) {
        const warningCount = data.warnings?.length ?? 0;
        const errorCount = data.errors?.length ?? 0;
        const type = warningCount > 0 ? 'warning' : 'success';
        const details: string[] = [
          ...(data.warnings ?? []),
          ...(data.errors ?? []),
        ];
        setCsvMessage({
          type,
          text: `インポート成功: ${data.success} 件 / 商品スキップ: ${warningCount} 件 / 失敗: ${errorCount} 件`,
          details: details.length > 0 ? details : undefined,
        });
        setCustomerCsvText('');
        await fetchData();
      } else {
        setCsvMessage({ type: 'error', text: `エラー: ${data.error}` });
      }
    } catch (err) {
      console.error(err);
      setCsvMessage({ type: 'error', text: '通信エラーが発生しました。' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      processAndImportCsv(event.target?.result as string);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverCustomer(false);
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    const file = files[0];
    if (!file.name.endsWith('.csv')) {
      alert('CSVファイルのみ対応しています。');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      processAndImportCsv(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  // CSVエクスポート
  const handleExportCustomersToCsv = () => {
    let csvContent = '\uFEFF';
    csvContent += '顧客名,来店周期(日),最終来店日,希望商品一覧\n';

    customers.forEach(c => {
      const escapedName = c.name.includes(',') || c.name.includes('"')
        ? `"${c.name.replace(/"/g, '""')}"`
        : c.name;

      const lastVisitStr = c.lastVisitDate ? new Date(c.lastVisitDate).toISOString().split('T')[0] : '';

      const reqsStr = c.requirements
        .map((r: any) => `${r.product.name}(x${formatFloat(r.quantity)})`)
        .join('; ');
      const escapedReqsStr = reqsStr.includes(',') || reqsStr.includes('"') || reqsStr.includes(';')
        ? `"${reqsStr.replace(/"/g, '""')}"`
        : reqsStr;

      csvContent += `${escapedName},${c.visitInterval},${lastVisitStr},${escapedReqsStr}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `顧客台帳_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  };

  if (loading && customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-100">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">顧客データを読み込んでいます...</p>
      </div>
    );
  }

  return (
    /* ============================================================
       独立スクロールレイアウト
       グリッドを h-[calc(100vh-8rem)] で高さ制約
       - 左カラム: flex-col + flex-1 overflow-y-auto でリストが独立スクロール
       - 右カラム: overflow-y-auto h-full で全カード縦スクロール
       ============================================================ */
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)] min-h-0">

      {/* ==============================
          左カラム：顧客一覧（独立スクロール）
          ============================== */}
      <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl flex flex-col min-h-0 h-full">

        {/* ヘッダー（固定） */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 px-6 pt-6 pb-4 flex-shrink-0">
          <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            顧客一覧 &amp; 希望商品（周期0＝来店不要）
          </h3>
          <button
            onClick={handleExportCustomersToCsv}
            className="flex items-center gap-1.5 self-start sm:self-center bg-indigo-650 hover:bg-indigo-550 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            顧客一覧CSV出力
          </button>
        </div>

        {/* 顧客リスト（独立スクロール） */}
        <div className="overflow-y-auto custom-scrollbar flex-1 px-6 pt-4 pb-6 space-y-3">
          {customers.map((cust) => {
            const isSelected = selectedCustomerId === cust.id;
            const isDeleteLoading = actionLoading === `delete-customer-${cust.id}`;
            return (
              <div
                key={cust.id}
                onClick={() => selectCustomerForReqs(cust)}
                className={`border rounded-xl p-4 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:border-slate-700 ${
                  isSelected
                    ? 'bg-slate-900/80 border-indigo-500 ring-1 ring-indigo-500'
                    : 'bg-slate-950/40 border-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-100 text-base">{cust.name}</h4>
                    {cust.visitInterval === 0 ? (
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 font-bold">
                        来店不要（非アクティブ）
                      </span>
                    ) : (
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                        予定日: {formatDate(cust.nextVisitDate)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-slate-400">
                    <div>周期: <span className="text-slate-200 font-semibold">{cust.visitInterval} 日</span></div>
                    {cust.lastVisitDate && (
                      <div>最終来店: <span className="text-slate-200 font-semibold">{formatDate(cust.lastVisitDate)}</span></div>
                    )}
                  </div>

                  {/* 希望商品のプレビュー */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cust.requirements.map((req: any, rIdx: number) => (
                      <span key={rIdx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 text-[10px] rounded">
                        {req.product.name}
                        <span className="text-indigo-400 font-bold">x{formatFloat(req.quantity)}</span>
                      </span>
                    ))}
                    {cust.requirements.length === 0 && (
                      <span className="text-slate-500 text-[10px] italic">希望商品の登録なし</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteCustomer(cust.id); }}
                    disabled={!!actionLoading}
                    className="bg-slate-850 hover:bg-rose-955/40 border border-slate-800 hover:border-rose-900 text-slate-400 hover:text-rose-400 p-2 rounded-lg transition-all cursor-pointer"
                  >
                    {isDeleteLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==============================
          右カラム：編集・登録・CSV（独立スクロール）
          ============================== */}
      <div className="overflow-y-auto custom-scrollbar h-full space-y-5 pr-0.5">

        {/* 選択顧客の希望商品 & スケジュール編集 */}
        {selectedCustomerId ? (
          <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <Save className="w-5 h-5 text-indigo-400" />
                設定・希望の編集
              </h3>
              <span className="text-xs bg-indigo-500/10 text-indigo-400 font-semibold px-2.5 py-0.5 rounded border border-indigo-500/20 truncate max-w-[8rem]">
                {customers.find(c => c.id === selectedCustomerId)?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">来店周期（0=来店不要）</label>
                <input
                  type="number"
                  min="0"
                  value={editVisitInterval}
                  onChange={(e) => setEditVisitInterval(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">最終来店日（起点）</label>
                <input
                  type="date"
                  value={editLastVisitDate}
                  onChange={(e) => setEditLastVisitDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="border-t border-slate-850 pt-4 space-y-3">
              <label className="block text-xs font-semibold text-slate-400">希望商品の新規追加</label>
              <div className="flex gap-2">
                <select
                  value={addReqProductId}
                  onChange={(e) => setAddReqProductId(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  value={addReqQuantity}
                  onChange={(e) => setAddReqQuantity(e.target.value)}
                  className="w-16 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-center text-white focus:outline-none"
                />
                <button
                  onClick={handleAddReq}
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  追加
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-400">登録済み希望商品の訂正</label>
              {selectedCustomerReqs.length === 0 ? (
                <p className="text-slate-500 text-xs italic">希望商品は現在ありません。</p>
              ) : (
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                  {selectedCustomerReqs.map((req) => {
                    const prod = products.find(p => p.id === req.productId);
                    return (
                      <div key={req.productId} className="bg-slate-950/50 border border-slate-850 p-2.5 rounded-lg flex items-center justify-between gap-3 text-xs">
                        <span className="font-semibold text-slate-200 truncate flex-1">{prod?.name || '不明な商品'}</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.01"
                            value={req.quantity}
                            onChange={(e) => handleUpdateReqQty(req.productId, parseFloat(e.target.value) || 0)}
                            className="w-16 bg-slate-900 border border-slate-800 text-center py-1 rounded focus:outline-none"
                          />
                          <button
                            onClick={() => handleRemoveReq(req.productId)}
                            type="button"
                            className="text-rose-400 hover:text-rose-300 p-1 hover:bg-slate-900 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={handleSaveReqs}
              disabled={actionLoading === 'save-reqs'}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer"
            >
              {actionLoading === 'save-reqs' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              設定と希望リストを保存（訂正適用）
            </button>
          </div>
        ) : (
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl text-center py-10">
            <Users className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 text-xs">顧客一覧から顧客を選択すると、<br />希望商品リストの訂正やスケジュール編集が行えます。</p>
          </div>
        )}

        {/* 新規顧客追加フォーム */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-slate-100 text-base mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-400" />
            新規顧客登録
          </h3>
          <form onSubmit={handleAddCustomer} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">氏名</label>
              <input
                type="text"
                required
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                placeholder="例: 佐藤 健一"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">来店周期（日）</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={newCustomerInterval}
                  onChange={(e) => setNewCustomerInterval(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">最終来店日（任意）</label>
                <input
                  type="date"
                  value={newCustomerLastVisit}
                  onChange={(e) => setNewCustomerLastVisit(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={actionLoading === 'add-customer'}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer"
            >
              顧客を追加
            </button>
          </form>
        </div>

        {/* CSVインポート（右カラム内に統合） */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-slate-100 text-base mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-400" />
            顧客台帳 CSVインポート
          </h3>

          {csvMessage && (
            <div className={`p-3 rounded-xl text-xs mb-4 ${
              csvMessage.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                : csvMessage.type === 'warning'
                ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
            }`}>
              <p className="font-semibold">{csvMessage.text}</p>
              {csvMessage.details && csvMessage.details.length > 0 && (
                <ul className="mt-1.5 space-y-0.5 list-disc list-inside opacity-80">
                  {csvMessage.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOverCustomer(true); }}
            onDragLeave={() => setIsDragOverCustomer(false)}
            onDrop={handleFileDrop}
            onClick={() => customerFileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[90px] mb-3 ${
              isDragOverCustomer
                ? 'border-indigo-500 bg-indigo-950/20 text-indigo-300 scale-[1.01]'
                : 'border-slate-800 hover:border-slate-600 bg-slate-950/20 text-slate-400'
            }`}
          >
            <Upload className="w-6 h-6 mb-1.5 text-indigo-400 animate-bounce" />
            <p className="text-xs font-semibold">CSVをドロップ、またはクリックして選択</p>
            <input
              type="file"
              ref={customerFileRef}
              onChange={handleFileSelect}
              accept=".csv"
              className="hidden"
            />
          </div>

          <div className="relative flex items-center py-2 mb-3">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-slate-500 text-[10px] uppercase font-bold">または直接入力</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <textarea
            rows={4}
            value={customerCsvText}
            onChange={(e) => setCustomerCsvText(e.target.value)}
            placeholder={"名前,来店周期(日),最終来店日,希望商品一覧\n山田太郎,14,2026-05-25,アムロジピン錠5mg:2;ロキソプロフェンNa錠60mg:1\n鈴木花子,0,,\n田中次郎,28,2026-05-01,"}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none text-white font-mono mb-3"
          />

          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-slate-500">※ 周期0は「来店不要」</span>
            <button
              onClick={() => processAndImportCsv(customerCsvText)}
              disabled={actionLoading === 'import-customers'}
              className="bg-indigo-650 hover:bg-indigo-550 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              テキストをインポート
            </button>
          </div>

          <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl text-xs text-slate-400 space-y-2">
            <p className="font-bold text-slate-200 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> フォーマット</p>
            <pre className="bg-slate-950 p-2 rounded text-[10px] text-indigo-300 overflow-x-auto leading-relaxed">
              {"名前,周期(日),最終来店日,希望商品一覧\n山田太郎,14,2026-05-25,薬A:2;薬B:1\n鈴木花子,0,,"}
            </pre>
            <ul className="text-[10px] text-slate-500 space-y-0.5 list-disc list-inside">
              <li>希望商品: <span className="text-indigo-400 font-mono">商品名:数量</span>、複数は <span className="text-indigo-400 font-mono">;</span> 区切り</li>
              <li>商品名は商品マスタと完全一致が必要</li>
              <li>周期 <span className="text-indigo-400 font-mono">0</span> = 来店不要（非アクティブ）</li>
            </ul>
          </div>
        </div>

      </div>{/* /右カラム */}
    </div>
  );
}
