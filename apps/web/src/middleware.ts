import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
