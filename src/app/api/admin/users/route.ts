import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth-token';
import { getUsersList, createUser, hasPermission } from '@/lib/server/auth-service';

async function getAuthUser(request: NextRequest) {
  const token =
    request.cookies.get(ADMIN_COOKIE_NAME)?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token) return null;
  return await verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required.' },
      { status: 401 }
    );
  }

  if (!hasPermission(user.role, 'manage_users')) {
    return NextResponse.json(
      { error: 'Forbidden: Only administrators can view and manage user accounts.' },
      { status: 403 }
    );
  }

  const users = getUsersList();
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized: Authentication required.' },
      { status: 401 }
    );
  }

  if (!hasPermission(user.role, 'manage_users')) {
    return NextResponse.json(
      { error: 'Forbidden: Only administrators can create new users.' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { email, name, role, password } = body || {};

    if (!email || !name || !role || !password) {
      return NextResponse.json(
        { error: 'Email, name, role, and password are required.' },
        { status: 400 }
      );
    }

    if (!['admin', 'editor', 'author'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be admin, editor, or author.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const newUser = await createUser({ email, name, role, password });
    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error creating user.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
