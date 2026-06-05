import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { SessionData, sessionOptions } from '@/lib/session';
import { isAdminCredentials } from '@/lib/auth';
import { systemDb } from '@/lib/system-db';
import { getTenantDb } from '@/lib/tenant-db';

export async function POST(request: Request) {
  try {
    const { email, password, tenantId, isAdmin } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'メールアドレスとパスワードを入力してください' }, { status: 400 });
    }

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    // スーパー管理者ログイン
    if (isAdmin) {
      if (!isAdminCredentials(email, password)) {
        return NextResponse.json({ error: 'メールアドレスまたはパスワードが違います' }, { status: 401 });
      }
      session.isLoggedIn = true;
      session.isAdmin = true;
      session.userEmail = email;
      session.userName = 'システム管理者';
      session.userRole = 'admin';
      await session.save();
      return NextResponse.json({ isAdmin: true, message: 'ログイン成功' });
    }

    // テナントユーザーログイン
    if (!tenantId) {
      return NextResponse.json({ error: '店舗IDを入力してください' }, { status: 400 });
    }

    // テナントの存在確認（スラッグで検索）
    const tenant = await systemDb.tenant.findFirst({
      where: { slug: tenantId.trim(), isActive: true },
    });

    if (!tenant) {
      return NextResponse.json({ error: '店舗IDが見つかりません' }, { status: 404 });
    }

    // テナントDBでユーザー認証
    const db = getTenantDb(tenant.id);
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'メールアドレスまたはパスワードが違います' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'メールアドレスまたはパスワードが違います' }, { status: 401 });
    }

    session.isLoggedIn = true;
    session.isAdmin = false;
    session.tenantId = tenant.id;
    session.tenantSlug = tenant.slug;
    session.userId = user.id;
    session.userEmail = user.email;
    session.userName = user.name;
    session.userRole = user.role;
    await session.save();

    return NextResponse.json({
      tenantId: tenant.id,
      tenantSlug: tenant.slug,
      message: 'ログイン成功',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
