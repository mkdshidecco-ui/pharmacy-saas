import { requireAuth } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Package,
  Users,
  History,
  Settings,
  LogOut,
  Store
} from 'lucide-react';
import React from 'react';

interface TenantLayoutProps {
  children: React.ReactNode;
  params: Promise<{ tenantId: string }>;
}

export default async function TenantLayout({ children, params }: TenantLayoutProps) {
  const { tenantId } = await params;

  // 認証と認可の確認
  const session = await requireAuth(tenantId);

  // テナントの取得
  const tenant = await resolveTenant(tenantId);
  if (!tenant) {
    redirect('/login');
  }

  const navItems = [
    { href: `/tenant/${tenantId}/dashboard`, label: 'ダッシュボード', icon: LayoutDashboard },
    { href: `/tenant/${tenantId}/calendar`, label: '来店スケジュール', icon: Calendar },
    { href: `/tenant/${tenantId}/inventory`, label: '在庫・仕入れ管理', icon: Package },
    { href: `/tenant/${tenantId}/customers`, label: '顧客・希望商品紐付け', icon: Users },
    { href: `/tenant/${tenantId}/sales`, label: '売上・廃棄履歴', icon: History },
    { href: `/tenant/${tenantId}/settings`, label: 'LINE BOT設定', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative">
      {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      {/* サイドバー */}
      <aside className="w-full md:w-64 bg-slate-900/60 backdrop-blur-md border-r border-slate-800 flex flex-col z-10 shrink-0">
        {/* 店舗名表示 */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-600/30">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-slate-200 tracking-wide text-sm truncate max-w-[150px]">
              {tenant.displayName}
            </h2>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block mt-0.5">
              テナントポータル
            </span>
          </div>
        </div>

        {/* ナビゲーションメニュー */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-xl text-sm font-medium transition-all duration-200 group"
              >
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 下部メニュー */}
        <div className="p-4 border-t border-slate-800">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl text-sm font-medium transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              ログアウト
            </button>
          </form>
        </div>
      </aside>

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col z-10 overflow-hidden">
        {/* トップバー */}
        <header className="border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">システム正常動作中</span>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>ログイン中:</span>
            <span className="font-semibold text-slate-300">{session.userName}</span>
            {session.isAdmin && (
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded text-[10px] font-bold">
                管理者
              </span>
            )}
          </div>
        </header>

        {/* ページ個別コンテンツ */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
