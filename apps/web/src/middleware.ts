import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session';

// IPごとのリクエストカウントを保持するメモリキャッシュ
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = 30; // 1分間に30回
  const windowMs = 60 * 1000;

  const record = rateLimitCache.get(ip);
  if (!record) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (now > record.resetTime) {
    // 期間が過ぎたらリセット
    record.count = 1;
    record.resetTime = now + windowMs;
    return false;
  }

  record.count += 1;
  return record.count > limit;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // APIルートへのレートリミット適用 (GETリクエストは除外)
  if (pathname.startsWith('/api') && request.method !== 'GET') {
    const ip = (request as any).ip || request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'リクエストが多すぎます。1分後に再度お試しください。' },
        { status: 429 }
      );
    }
  }

  // 静的ファイル・公開ページはスキップ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname === '/' ||
    pathname === '/login'
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  // 管理者ページの保護
  if (pathname.startsWith('/admin')) {
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
  }

  // テナントページの保護
  const tenantMatch = pathname.match(/^\/tenant\/([^/]+)/);
  if (tenantMatch) {
    const tenantSlug = tenantMatch[1];
    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // 管理者は全テナントにアクセス可能
    if (session.isAdmin) return response;
    // テナントユーザーは自分のテナントのみ
    if (session.tenantSlug !== tenantSlug) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
  }

  // テナントAPIの保護
  const apiTenantMatch = pathname.match(/^\/api\/([^/]+)\//);
  if (apiTenantMatch && !['auth', 'admin'].includes(apiTenantMatch[1])) {
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }
    const tenantSlug = apiTenantMatch[1];
    if (!session.isAdmin && session.tenantSlug !== tenantSlug) {
      return NextResponse.json({ error: 'アクセス権限がありません' }, { status: 403 });
    }
    return response;
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
