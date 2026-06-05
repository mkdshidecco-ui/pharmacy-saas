'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Package,
  Plus,
  Trash2,
  Loader2,
  Download,
  Upload,
  History,
  ShoppingBag,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { formatFloat } from '@/lib/utils';

export default function TenantInventory() {
  const params = useParams();
  const tenantId = params?.tenantId as string;
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [disposals, setDisposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // 新規商品用
  const [newProductName, setNewProductName] = useState('');
  const [newProductStock, setNewProductStock] = useState<string>('0');
  const [newProductUnit, setNewProductUnit] = useState('');

  // 仕入れ用
  const [purchaseProductId, setPurchaseProductId] = useState('');
  const [purchaseQuantity, setPurchaseQuantity] = useState<string>('10');
  const [purchaseWholesaler, setPurchaseWholesaler] = useState('');

  // 手動売上用
  const [saleProductId, setSaleProductId] = useState('');
  const [saleQuantity, setSaleQuantity] = useState<string>('1');

  // 廃棄用
  const [disposalProductId, setDisposalProductId] = useState('');
  const [disposalQuantity, setDisposalQuantity] = useState<string>('1');
  const [disposalReason, setDisposalReason] = useState('');

  // CSVインポート
  const [productCsvText, setProductCsvText] = useState('');
  const [csvMessage, setCsvMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDragOverProduct, setIsDragOverProduct] = useState(false);
  const productFileRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, purchRes, dispRes] = await Promise.all([
        fetch(`/api/${tenantId}/products`),
        fetch(`/api/${tenantId}/purchases`),
        fetch(`/api/${tenantId}/disposals`),
      ]);

      if (prodRes.status === 401) {
        router.push('/login');
        return;
      }

      const prodData = await prodRes.json();
      const purchData = await purchRes.json();
      const dispData = await dispRes.json();

      setProducts(prodData);
      setPurchases(purchData);
      setDisposals(dispData);

      if (prodData.length > 0) {
        setPurchaseProductId(prodData[0].id);
        setSaleProductId(prodData[0].id);
        setDisposalProductId(prodData[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch inventory data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tenantId) {
      fetchData();
    }
  }, [tenantId]);

  // 在庫数手動更新 (Float対応)
  const handleUpdateStock = async (id: string, currentStock: number) => {
    setActionLoading(`stock-${id}`);
    try {
      const res = await fetch(`/api/${tenantId}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentStock }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // 商品削除
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('本当にこの商品を削除しますか？紐づく希望商品や履歴も削除されます。')) return;
    setActionLoading(`delete-product-${id}`);
    try {
      const res = await fetch(`/api/${tenantId}/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchData();
      } else {
        alert('商品の削除に失敗しました。');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // 新規商品追加 (Float対応)
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;
    setActionLoading('add-product');
    try {
      const res = await fetch(`/api/${tenantId}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProductName,
          currentStock: parseFloat(newProductStock) || 0,
          unit: newProductUnit || null,
        }),
      });
      if (res.ok) {
        setNewProductName('');
        setNewProductStock('0');
        setNewProductUnit('');
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // 仕入れ登録
  const handleAddPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(purchaseQuantity);
    if (!purchaseProductId || isNaN(qty) || qty <= 0 || !purchaseWholesaler.trim()) return;
    setActionLoading('add-purchase');
    try {
      const res = await fetch(`/api/${tenantId}/purchases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: purchaseProductId,
          quantity: qty,
          wholesaler: purchaseWholesaler,
        }),
      });
      if (res.ok) {
        setPurchaseQuantity('10');
        setPurchaseWholesaler('');
        await fetchData();
      } else {
        alert('仕入れ登録に失敗しました。');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // 手動売上登録
  const handleAddSale = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(saleQuantity);
    if (!saleProductId || isNaN(qty) || qty <= 0) return;
    setActionLoading('add-sale');
    try {
      const res = await fetch(`/api/${tenantId}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: saleProductId,
          quantity: qty,
        }),
      });
      if (res.ok) {
        setSaleQuantity('1');
        await fetchData();
      } else {
        alert('売上の登録に失敗しました。');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // 廃棄登録
  const handleAddDisposal = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(disposalQuantity);
    if (!disposalProductId || isNaN(qty) || qty <= 0) return;
    setActionLoading('add-disposal');
    try {
      const res = await fetch(`/api/${tenantId}/disposals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: disposalProductId,
          quantity: qty,
          reason: disposalReason,
        }),
      });
      if (res.ok) {
        setDisposalQuantity('1');
        setDisposalReason('');
        await fetchData();
      } else {
        alert('廃棄の登録に失敗しました。');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // CSV検証とインポート
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
                    (cols[0].includes('商品名') || cols[0].includes('name')) &&
                    (cols[1].includes('在庫') || cols[1].includes('stock'));

    if (!isValid) {
      setCsvMessage({ type: 'error', text: 'CSVヘッダー形式が異なります。（商品名,現在庫数,単位(任意)）' });
      return;
    }

    setActionLoading('import-products');
    try {
      const res = await fetch(`/api/${tenantId}/products/csv-import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvText }),
      });
      const data = await res.json();
      if (res.ok) {
        setCsvMessage({
          type: 'success',
          text: `インポート成功: ${data.success} 件 / 失敗: ${data.errors.length} 件`,
        });
        setProductCsvText('');
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

  // ファイルインプット
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

  // ファイルドロップ
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverProduct(false);
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

  // 在庫一覧CSVエクスポート
  const handleExportProductsToCsv = () => {
    let csvContent = '\uFEFF';
    csvContent += '商品名,現在庫数,単位\n';
    
    products.forEach(p => {
      const escapedName = p.name.includes(',') || p.name.includes('"') 
        ? `"${p.name.replace(/"/g, '""')}"` 
        : p.name;
      csvContent += `${escapedName},${p.currentStock},${p.unit || ''}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `現在庫マスター_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-100">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">在庫データを読み込んでいます...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 商品一覧 */}
        <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              商品在庫マスター（小数・マイナス対応）
            </h3>
            <button
              onClick={handleExportProductsToCsv}
              className="flex items-center gap-1.5 self-start sm:self-center bg-indigo-650 hover:bg-indigo-550 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              現在庫CSV出力
            </button>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
            {products.map((prod) => {
              const isStockLoading = actionLoading === `stock-${prod.id}`;
              const isDeleteLoading = actionLoading === `delete-product-${prod.id}`;
              return (
                <div key={prod.id} className="bg-slate-950/40 border border-slate-850 hover:border-slate-700 transition-all rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-200 text-base">{prod.name}</h4>
                    <p className="text-[10px] text-slate-500">ID: {prod.id} {prod.unit ? `[単位: ${prod.unit}]` : ''}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-400 font-medium">現在庫:</label>
                      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleUpdateStock(prod.id, prod.currentStock - 1)}
                          disabled={!!actionLoading}
                          className="px-3 py-1.5 hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-sm font-bold disabled:opacity-50 cursor-pointer"
                        >
                          -1
                        </button>
                        <input
                          type="number"
                          step="0.01"
                          value={prod.currentStock}
                          onChange={(e) => handleUpdateStock(prod.id, parseFloat(e.target.value) || 0)}
                          disabled={!!actionLoading}
                          className="w-20 bg-transparent text-center border-none text-sm font-semibold focus:outline-none text-white"
                        />
                        <button
                          onClick={() => handleUpdateStock(prod.id, prod.currentStock + 1)}
                          disabled={!!actionLoading}
                          className="px-3 py-1.5 hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-sm font-bold disabled:opacity-50 cursor-pointer"
                        >
                          +1
                        </button>
                      </div>
                      {isStockLoading && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
                    </div>

                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      disabled={!!actionLoading}
                      className="bg-slate-800 hover:bg-rose-955/40 border border-slate-750 hover:border-rose-900 text-slate-400 hover:text-rose-400 p-2 rounded-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                      title="商品削除"
                    >
                      {isDeleteLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右カラム：登録・仕入れフォーム群 */}
        <div className="space-y-6">
          {/* 新規商品登録 */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-slate-100 text-base mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              新規商品登録
            </h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">商品名</label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="例: アムロジピン錠5mg"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">初期在庫数</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">単位（任意）</label>
                  <input
                    type="text"
                    value={newProductUnit}
                    onChange={(e) => setNewProductUnit(e.target.value)}
                    placeholder="例: 錠, g, ml"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={actionLoading === 'add-product'}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {actionLoading === 'add-product' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                商品を追加
              </button>
            </form>
          </div>

          {/* 仕入れ入力 */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-slate-100 text-base mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              仕入れ登録
            </h3>
            <form onSubmit={handleAddPurchase} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">対象商品</label>
                <select
                  value={purchaseProductId}
                  onChange={(e) => setPurchaseProductId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">仕入れ数量</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={purchaseQuantity}
                    onChange={(e) => setPurchaseQuantity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">卸名（仕入れ先）</label>
                  <input
                    type="text"
                    required
                    value={purchaseWholesaler}
                    onChange={(e) => setPurchaseWholesaler(e.target.value)}
                    placeholder="例: アルフレッサ"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={actionLoading === 'add-purchase'}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                仕入れを登録
              </button>
            </form>
          </div>

          {/* 手動売上 */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-slate-100 text-base mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              売上登録（手動・一般顧客）
            </h3>
            <form onSubmit={handleAddSale} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">対象商品</label>
                <select
                  value={saleProductId}
                  onChange={(e) => setSaleProductId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">売上数量</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={saleQuantity}
                  onChange={(e) => setSaleQuantity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                disabled={actionLoading === 'add-sale'}
                className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                売上を登録
              </button>
            </form>
          </div>

          {/* 廃棄入力 */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-slate-100 text-base mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400" />
              廃棄登録
            </h3>
            <form onSubmit={handleAddDisposal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">対象商品</label>
                <select
                  value={disposalProductId}
                  onChange={(e) => setDisposalProductId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">廃棄数量</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={disposalQuantity}
                    onChange={(e) => setDisposalQuantity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">廃棄理由</label>
                  <input
                    type="text"
                    value={disposalReason}
                    onChange={(e) => setDisposalReason(e.target.value)}
                    placeholder="破損、使用期限切れ"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={actionLoading === 'add-disposal'}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                廃棄を登録
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 仕入れ履歴 & 廃棄履歴の一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 仕入れ履歴 */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-slate-100 text-base mb-4 border-b border-slate-800 pb-3">仕入れ履歴（直近100件）</h3>
          {purchases.length === 0 ? (
            <p className="text-slate-500 text-xs italic text-center py-6">仕入れ履歴はありません。</p>
          ) : (
            <div className="overflow-x-auto max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <th className="py-2 px-3">日時</th>
                    <th className="py-2 px-3">商品名</th>
                    <th className="py-2 px-3">数量</th>
                    <th className="py-2 px-3">仕入れ先</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {purchases.map(p => (
                    <tr key={p.id} className="hover:bg-slate-900/35">
                      <td className="py-2.5 px-3 text-slate-400">{formatDate(p.purchasedAt)}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-200">{p.product?.name}</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">+{formatFloat(p.quantity)}</td>
                      <td className="py-2.5 px-3 text-slate-350">{p.wholesaler}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 廃棄履歴 */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="font-bold text-slate-100 text-base mb-4 border-b border-slate-800 pb-3">廃棄履歴（直近100件）</h3>
          {disposals.length === 0 ? (
            <p className="text-slate-500 text-xs italic text-center py-6">廃棄履歴はありません。</p>
          ) : (
            <div className="overflow-x-auto max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <th className="py-2 px-3">日時</th>
                    <th className="py-2 px-3">商品名</th>
                    <th className="py-2 px-3">数量</th>
                    <th className="py-2 px-3">理由</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {disposals.map(d => (
                    <tr key={d.id} className="hover:bg-slate-900/35">
                      <td className="py-2.5 px-3 text-slate-400">{formatDate(d.disposedAt)}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-200">{d.product?.name}</td>
                      <td className="py-2.5 px-3 text-rose-400 font-bold">-{formatFloat(d.quantity)}</td>
                      <td className="py-2.5 px-3 text-slate-350">{d.reason || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* CSVインポート */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="font-bold text-slate-100 text-base mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-400" />
          商品マスタ CSVインポート（小数・マイナス対応）
        </h3>
        {csvMessage && (
          <div className={`p-4 rounded-xl text-xs mb-4 ${csvMessage.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'}`}>
            {csvMessage.text}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOverProduct(true); }}
              onDragLeave={() => setIsDragOverProduct(false)}
              onDrop={handleFileDrop}
              onClick={() => productFileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[120px] ${
                isDragOverProduct 
                  ? 'border-indigo-500 bg-indigo-950/20 text-indigo-300 scale-[1.01]' 
                  : 'border-slate-800 hover:border-slate-600 bg-slate-950/20 text-slate-400'
              }`}
            >
              <Upload className="w-8 h-8 mb-2 text-indigo-400 animate-bounce" />
              <p className="text-xs font-semibold">CSVファイルをドラッグ＆ドロップするか、クリックしてファイルを選択</p>
              <input
                type="file"
                ref={productFileRef}
                onChange={handleFileSelect}
                accept=".csv"
                className="hidden"
              />
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-slate-500 text-[10px] uppercase font-bold">または CSVテキストを直接入力</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <textarea
              rows={3}
              value={productCsvText}
              onChange={(e) => setProductCsvText(e.target.value)}
              placeholder="商品名,現在庫数,単位&#10;アムロジピン錠,100,錠&#10;ワセリン,500.5,g"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none text-white font-mono"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500">※ 同名商品がある場合は在庫数と単位が上書きされます。</span>
              <button
                onClick={() => processAndImportCsv(productCsvText)}
                disabled={actionLoading === 'import-products'}
                className="bg-indigo-650 hover:bg-indigo-550 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                テキストをインポート
              </button>
            </div>
          </div>
          <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl text-xs text-slate-400 space-y-2">
            <p className="font-bold text-slate-200 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> フォーマット例</p>
            <pre className="bg-slate-950 p-2 rounded text-[10px] text-indigo-300 overflow-x-auto">
              {"商品名,現在庫数,単位\nアムロジピン錠5mg,120,錠\nヒルドイドソフト,450.5,g"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
