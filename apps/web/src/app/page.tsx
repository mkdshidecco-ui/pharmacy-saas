'use client';

import Link from 'next/link';

export default function LandingPage() {
  const features = [
    { icon: '📦', title: '在庫管理', desc: '商品在庫のリアルタイム管理。小数・マイナス値にも対応。仕入れ・廃棄・売上を一括管理。' },
    { icon: '📅', title: '来店予測', desc: '周期に基づくカレンダー繰り返し表示。1週間単位で前後スクロール可能。' },
    { icon: '🤖', title: 'LINE BOT連携', desc: 'LINEメッセージで欠品確認・来局登録をスタッフが手軽に操作。' },
    { icon: '🏢', title: 'マルチテナント', desc: '複数店舗・施設を一つのプラットフォームで完全データ分離管理。' },
    { icon: '🔒', title: 'セキュリティ', desc: 'テナントごとに独立したDBでデータ漏洩リスクをゼロに。' },
    { icon: '📊', title: 'ダッシュボード', desc: '在庫不足アラート・不動在庫・来店スケジュールを一覧表示。' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)',
      color: '#f1f5f9',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* 背景装飾 */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      {/* ヘッダー */}
      <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(2,6,23,0.8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>💊</div>
          <span style={{ fontSize: '1.25rem', fontWeight: '800', background: 'linear-gradient(135deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PharmaSaaS</span>
        </div>
        <Link href="/login" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', padding: '0.625rem 1.5rem', borderRadius: '0.75rem', fontWeight: '600', textDecoration: 'none', fontSize: '0.875rem', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>
          ログイン
        </Link>
      </header>

      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        {/* ヒーロー */}
        <section style={{ textAlign: 'center', padding: '6rem 2rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '9999px', padding: '0.375rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#a5b4fc', marginBottom: '2rem' }}>
            <span>✨</span><span>マルチテナント対応 SaaS プラットフォーム</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 50%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            薬局・店舗向け<br />クラウド管理システム
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '3rem' }}>
            在庫管理・来店予測・LINE BOT連携が一つに。<br />複数店舗を一元管理するマルチテナント対応SaaSプラットフォーム。
          </p>
          <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', padding: '1rem 2.5rem', borderRadius: '0.875rem', fontWeight: '700', textDecoration: 'none', fontSize: '1rem', boxShadow: '0 8px 30px rgba(99,102,241,0.4)' }}>
            システムにログイン →
          </Link>
        </section>

        {/* 機能カード */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '700', marginBottom: '3rem', color: '#e2e8f0' }}>主な機能</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {features.map((f) => (
              <div key={f.title} style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1.5rem', backdropFilter: 'blur(10px)', transition: 'border-color 0.2s', cursor: 'default' }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)')}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 style={{ fontWeight: '700', marginBottom: '0.5rem', color: '#e2e8f0' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#475569', fontSize: '0.875rem' }}>
        © 2026 PharmaSaaS. All rights reserved.
      </footer>
    </div>
  );
}
