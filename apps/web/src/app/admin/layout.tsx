import { requireAdmin } from '@/lib/auth';
import Link from 'next/link';
import { Shield, LayoutDashboard, LogOut } from 'lucide-react';
import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // スーパー管理者認証の検証
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative">
      {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      {/* トップバー */}
      <header className="relative border-b border-slate-800 bg-slate-900/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-650 p-2 rounded-xl shadow-lg shadow-indigo-600/30">
              <Shield className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                PharmaSaaS スーパー管理者ポータル
              </h1>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                システム設定・マルチテナント管理
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-400">
              管理者: <span className="font-semibold text-slate-350">{session.userEmail}</span>
            </span>
            <form action="/api/auth/logout" method="POST" className="shrink-0">
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                ログアウト
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10 flex-grow w-full">
        {children}
      </main>
    </div>
  );
}
