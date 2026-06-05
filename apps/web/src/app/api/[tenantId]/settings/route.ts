import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { resolveTenant } from '@/lib/utils';
import { systemDb } from '@/lib/system-db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  try {
    const { tenantId } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const tenant = await resolveTenant(tenantId);
    if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

    // セキュリティのため、シークレットとトークンを一部マスクして返す
    const maskString = (str: string | null) => {
      if (!str) return '';
      if (str.length <= 8) return '********';
      return `${str.substring(0, 4)}...${str.substring(str.length - 4)}`;
    };

    return NextResponse.json({
      id: tenant.id,
      slug: tenant.slug,
      displayName: tenant.displayName,
      industry: tenant.industry,
      lineChannelSecret: tenant.lineChannelSecret ? '********' : '',
      lineChannelAccessToken: tenant.lineChannelAccessToken ? '********' : '',
      hasSecret: !!tenant.lineChannelSecret,
      hasToken: !!tenant.lineChannelAccessToken,
      isActive: tenant.isActive,
    });
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  try {
    const { tenantId } = await params;
    const session = await getSession();
    if (!session.isLoggedIn) return NextResponse.json({ error: '認証が必要です' }, { status: 401 });

    const tenant = await resolveTenant(tenantId);
    if (!tenant) return NextResponse.json({ error: 'テナントが見つかりません' }, { status: 404 });

    const { lineChannelSecret, lineChannelAccessToken } = await request.json();

    const updateData: any = {};
    // マスク文字列 '********' の場合は更新しない
    if (lineChannelSecret !== undefined && lineChannelSecret !== '********') {
      updateData.lineChannelSecret = lineChannelSecret || null;
    }
    if (lineChannelAccessToken !== undefined && lineChannelAccessToken !== '********') {
      updateData.lineChannelAccessToken = lineChannelAccessToken || null;
    }

    const updatedTenant = await systemDb.tenant.update({
      where: { id: tenant.id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      hasSecret: !!updatedTenant.lineChannelSecret,
      hasToken: !!updatedTenant.lineChannelAccessToken,
    });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
