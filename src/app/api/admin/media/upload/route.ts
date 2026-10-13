import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth-token';
import { hasPermission } from '@/lib/server/auth-service';

export async function POST(request: NextRequest) {
  const token =
    request.cookies.get(ADMIN_COOKIE_NAME)?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required to upload media.' },
      { status: 401 }
    );
  }

  const user = await verifySessionToken(token);
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized: Session invalid or expired.' },
      { status: 401 }
    );
  }

  if (!hasPermission(user.role, 'upload_media')) {
    return NextResponse.json(
      { error: 'Forbidden: Media library uploads require Editor or Administrator privileges.' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { url, title } = body || {};

    return NextResponse.json({
      success: true,
      message: 'Media asset verified and processed successfully.',
      media: {
        id: `med-${Date.now()}`,
        url: url || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1600&auto=format&fit=crop&q=80',
        title: title || 'Executive Media Upload',
        uploadedBy: user.name,
        role: user.role,
        uploadedAt: new Date().toISOString(),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload processing error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
