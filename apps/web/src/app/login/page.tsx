'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [loginMode, setLoginMode] = useState<'tenant' | 'admin'>('tenant');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          tenantId: loginMode === 'tenant' ? tenantId.trim() : undefined,
          isAdmin: loginMode === 'admin',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'ログインに失敗しました');
        return;
      }
      if (data.isAdmin) {
        router.push('/admin');
      } else {
        router.push(`/tenant/${data.tenantSlug}/dashboard`);
      }
    } catch {
      setError('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#f1f5f9', fontSize: '0.875rem',
    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}>
        {/* ロゴ */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '3.5rem', height: '3.5rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>💊</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PharmaSaaS</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>ログイン</p>
        </div>

        {/* カード */}
        <div style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '2rem', backdropFilter: 'blur(20px)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
          {/* モード切替 */}
          <div style={{ display: 'flex', background: 'rgba(2,6,23,0.8)', borderRadius: '0.75rem', padding: '0.25rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            {(['tenant', 'admin'] as const).map((mode) => (
              <button key={mode} onClick={() => setLoginMode(mode)} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600', transition: 'all 0.2s', background: loginMode === mode ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent', color: loginMode === mode ? 'white' : '#64748b' }}>
                {mode === 'tenant' ? '店舗ログイン' : '管理者ログイン'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {loginMode === 'tenant' && (
              <div>
                <label style={labelStyle}>店舗ID（テナントID）</label>
                <input type="text" required value={tenantId} onChange={(e) => setTenantId(e.target.value)} placeholder="例: yanagiya-pharmacy" style={inputStyle} />
              </div>
            )}
            <div>
              <label style={labelStyle}>メールアドレス</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@pharmacy.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>パスワード</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
            </div>

            {error && (
              <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fb7185', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', fontWeight: '700', fontSize: '0.875rem', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 15px rgba(99,102,241,0.3)', transition: 'all 0.2s', marginTop: '0.5rem' }}>
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
