import { SessionOptions } from 'iron-session';

export interface SessionData {
  tenantId?: string;      // テナントの内部ID（UUIDなど）
  tenantSlug?: string;    // テナントのスラッグ（URLで使用）
  userId?: string;
  userEmail?: string;
  userName?: string;
  userRole?: string;
  isAdmin?: boolean;      // スーパー管理者フラグ
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    'pharmacy-saas-secret-key-change-in-production-must-be-32chars!!',
  cookieName: 'pharmacy-saas-session',
  cookieOptions: {
    // SSL設定前（IPアドレス直接アクセスなど）のHTTP環境でも動作させるため、一時的にfalseに設定します。
    // 将来的にドメインを設定しHTTPS化（SSL対応）した際は true に戻すことを推奨します。
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7日間
  },
};
