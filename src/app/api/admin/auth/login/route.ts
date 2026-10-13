import { NextRequest, NextResponse } from 'next/server';
import {
  authenticateUser,
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginRateLimit,
} from '@/lib/server/auth-service';
import { createSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth-token';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Determine client identifier for rate limiting (IP + Email)
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'localhost';
    const rateLimitKey = `${clientIp}:${email.toLowerCase().trim()}`;

    // Check rate limit
    const rateStatus = checkLoginRateLimit(rateLimitKey);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. For security, access is temporarily locked. Please try again in ${rateStatus.retryAfterSeconds} seconds.`,
          retryAfter: rateStatus.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    // Authenticate with bcrypt
    const user = await authenticateUser(email, password);
    if (!user) {
      const failedStatus = recordFailedLogin(rateLimitKey);
      const remainingMsg =
        failedStatus.remainingAttempts > 0
          ? `${failedStatus.remainingAttempts} attempt(s) remaining before temporary lockout.`
          : 'Account locked for 15 minutes due to multiple failed attempts.';

      return NextResponse.json(
        {
          error: `Invalid credentials. ${remainingMsg}`,
          remainingAttempts: failedStatus.remainingAttempts,
        },
        { status: 401 }
      );
    }

    // Reset rate limit counter on success
    resetLoginRateLimit(rateLimitKey);

    // Create signed JWT
    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    });

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        },
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
