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
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7日間
  },
};
