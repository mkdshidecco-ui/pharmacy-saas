import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from './session';
import { redirect } from 'next/navigation';

/** 現在のセッションを取得 */
export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return session;
}

/** ログイン済みセッションを取得（未ログインはログインページへリダイレクト） */
export async function requireAuth(tenantSlug?: string) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect('/login');
  }

  // テナントスラッグが指定された場合、アクセス権を確認
  if (tenantSlug && session.tenantSlug !== tenantSlug && !session.isAdmin) {
    redirect('/login');
  }

  return session;
}

/** スーパー管理者セッションを取得（管理者でない場合はリダイレクト） */
export async function requireAdmin() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.isAdmin) {
    redirect('/login');
  }

  return session;
}

/**
 * スーパー管理者かどうかを確認する（環境変数方式）
 */
export function isAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pharmacy-saas.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
  return email === adminEmail && password === adminPassword;
}
