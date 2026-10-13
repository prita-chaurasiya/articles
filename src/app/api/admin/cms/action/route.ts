import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth-token';
import { hasPermission } from '@/lib/server/auth-service';
import { saveSupabaseArticle, deleteSupabaseArticle } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const token =
    request.cookies.get(ADMIN_COOKIE_NAME)?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required.' },
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

  try {
    const body = await request.json();
    const { action, articleId, data } = body || {};

    switch (action) {
      case 'publish':
        if (!hasPermission(user.role, 'publish_article')) {
          return NextResponse.json(
            {
              error:
                'Forbidden: Author accounts cannot directly publish articles live. Please submit as a draft for editorial approval.',
            },
            { status: 403 }
          );
        }

        if (data) {
          await saveSupabaseArticle(data);
        }

        return NextResponse.json({
          success: true,
          message: 'Article published live by authorized editorial personnel.',
          action,
          by: user.name,
        });

      case 'delete':
        if (!hasPermission(user.role, 'delete_article')) {
          return NextResponse.json(
            { error: 'Forbidden: You do not have permission to delete articles.' },
            { status: 403 }
          );
        }

        if (articleId) {
          await deleteSupabaseArticle(articleId);
        }

        return NextResponse.json({
          success: true,
          message: `Article ${articleId || ''} deleted by ${user.role}.`,
        });

      case 'reset_seed':
        if (!hasPermission(user.role, 'reset_seed')) {
          return NextResponse.json(
            { error: 'Forbidden: Only administrators can reset the database seed.' },
            { status: 403 }
          );
        }
        return NextResponse.json({
          success: true,
          message: 'Database reset to default seed.',
        });

      case 'draft':
      case 'edit_draft':
        return NextResponse.json({
          success: true,
          message: 'Draft saved successfully.',
          action,
        });

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error processing CMS action';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
