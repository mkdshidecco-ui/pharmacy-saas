import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { systemDb } from '@/lib/system-db';
import { getTenantDb } from '@/lib/tenant-db';
import bcrypt from 'bcryptjs';

// テナントユーザー一覧
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const tenant = await systemDb.tenant.findUnique({ where: { id } });
  if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

  const db = getTenantDb(tenant.id);
  const users = await db.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(users);
}

// テナントユーザー追加
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const { email, password, name, role } = await request.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: 'メール・パスワード・名前は必須です' }, { status: 400 });
  }

  const tenant = await systemDb.tenant.findUnique({ where: { id } });
  if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

  const db = getTenantDb(tenant.id);
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await db.user.create({
      data: { email, password: hashedPassword, name, role: role || 'staff' },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'このメールアドレスは既に登録されています' }, { status: 409 });
    }
    return NextResponse.json({ error: 'ユーザーの作成に失敗しました' }, { status: 500 });
  }
}
