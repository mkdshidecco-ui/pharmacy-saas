import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PharmaSaaS - 薬局・店舗向けクラウド管理システム',
  description: '在庫管理・来店予測・LINE BOT連携が一つに。薬局・小売店・医療機関向けマルチテナントSaaS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; }
          * { margin: 0; padding: 0; }
          html, body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: #020617;
            color: #f1f5f9;
            -webkit-font-smoothing: antialiased;
          }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
          .animate-spin { animation: spin 1s linear infinite; }
          .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          input[type=number]::-webkit-outer-spin-button,
          input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
          input[type=number] { -moz-appearance: textfield; }
          input:focus, select:focus, textarea:focus, button:focus { outline: none; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
