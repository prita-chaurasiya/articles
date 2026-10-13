import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth-token';

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Allow login page and public auth API endpoints
  if (pathname === '/admin/login' || pathname === '/api/admin/auth/login') {
    // If already authenticated and visiting /admin/login, redirect to /admin
    if (pathname === '/admin/login') {
      const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      if (token) {
        const user = await verifySessionToken(token);
        if (user) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      }
    }

    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    return response;
  }

  // 2. Check if route is protected web route
  const isProtectedWebRoute =
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname === '/studio' ||
    pathname.startsWith('/studio/');

  // 3. Check if route is protected admin API
  const isProtectedApiRoute = pathname.startsWith('/api/admin/');

  if (isProtectedWebRoute || isProtectedApiRoute) {
    const token =
      request.cookies.get(ADMIN_COOKIE_NAME)?.value ||
      request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

    const user = token ? await verifySessionToken(token) : null;

    if (!user) {
      // Block unauthenticated API requests with 401
      if (isProtectedApiRoute) {
        return NextResponse.json(
          { error: 'Unauthorized: Authentication required.' },
          { status: 401 }
        );
      }

      // Redirect unauthenticated visitors to /admin/login
      const redirectUrl = new URL('/admin/login', request.url);
      if (pathname !== '/admin') {
        redirectUrl.searchParams.set('redirect', pathname + (search || ''));
      }
      const response = NextResponse.redirect(redirectUrl);
      response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
      return response;
    }

    // If authenticated user visits aliases /dashboard or /studio, route to /admin
    if (
      pathname === '/dashboard' ||
      pathname.startsWith('/dashboard/') ||
      pathname === '/studio' ||
      pathname.startsWith('/studio/')
    ) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Authenticated request: append user context and security headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-admin-user-id', user.id);
    requestHeaders.set('x-admin-user-role', user.role);
    requestHeaders.set('x-admin-user-email', user.email);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    return response;
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/studio/:path*',
    '/api/admin/:path*',
  ],
};
