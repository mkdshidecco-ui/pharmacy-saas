import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { systemDb } from '@/lib/system-db';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

// テナント一覧取得
export async function GET() {
  await requireAdmin();
  const tenants = await systemDb.tenant.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(tenants);
}

// テナント新規作成
export async function POST(request: Request) {
  await requireAdmin();
  try {
    const { slug, displayName, industry, lineChannelSecret, lineChannelAccessToken } = await request.json();

    if (!slug || !displayName) {
      return NextResponse.json({ error: '店舗ID（スラッグ）と店舗名は必須です' }, { status: 400 });
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: '店舗IDは英小文字・数字・ハイフンのみ使用できます' }, { status: 400 });
    }

    // 先にシステムDBに登録して ID (UUID) を取得する
    const tenant = await systemDb.tenant.create({
      data: {
        slug,
        displayName,
        industry: industry || 'pharmacy',
        lineChannelSecret: lineChannelSecret || null,
        lineChannelAccessToken: lineChannelAccessToken || null,
      },
    });

    // テナントDBディレクトリ作成（UUID の tenant.id を使用）
    const dataRoot = process.env.DATA_ROOT || '/data';
    const tenantDataDir = path.join(dataRoot, 'tenants', tenant.id);
    if (!fs.existsSync(tenantDataDir)) {
      fs.mkdirSync(tenantDataDir, { recursive: true });
    }

    // テナントDBを初期化（テンプレートDBのコピー方式）
    try {
      const templatePath = path.join(dataRoot, 'system', 'tenant-template.db');
      const dbPath = path.join(tenantDataDir, 'dev.db');

      if (!fs.existsSync(templatePath)) {
        throw new Error('Tenant DB template not found. Please restart the container to generate it.');
      }

      fs.copyFileSync(templatePath, dbPath);
      console.log(`Initialized tenant DB via template: ${dbPath}`);
    } catch (migrateError) {
      console.error('DB init error:', migrateError);
      // ロールバック (作成したDBフォルダの削除とレコードの削除)
      if (fs.existsSync(tenantDataDir)) {
        fs.rmSync(tenantDataDir, { recursive: true, force: true });
      }
      await systemDb.tenant.delete({ where: { id: tenant.id } });
      return NextResponse.json({ error: 'テナントDBの初期化に失敗しました。' }, { status: 500 });
    }

    return NextResponse.json(tenant, { status: 201 });
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'この店舗IDは既に使用されています' }, { status: 409 });
    }
    console.error('Create tenant error:', error);
    return NextResponse.json({ error: 'テナントの作成に失敗しました' }, { status: 500 });
  }
}
