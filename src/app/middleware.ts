// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = ['/', '/auth', '/_next', '/favicon.ico', '/api'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public assets and APIs
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get NextAuth session (user) and custom cookie-based token (hospital/admin)
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;

  // ✅ Redirection logic for '/auth' route based on session/token
  if (pathname === '/auth') {
    if (session) return NextResponse.redirect(new URL('/dashboard/user', req.url));
    if (token && role === 'hospital') return NextResponse.redirect(new URL('/dashboard/hospital', req.url));
    if (token && role === 'admin') return NextResponse.redirect(new URL('/dashboard/admin', req.url));
    return NextResponse.next(); // Show generic /auth page
  }

  // ✅ Protect /dashboard/user - requires NextAuth session
  if (pathname.startsWith('/dashboard/user')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/user', req.url));
    }
    return NextResponse.next();
  }

  // ✅ Protect /dashboard/hospital - requires token + role = hospital
  if (pathname.startsWith('/dashboard/hospital')) {
    if (!token || role !== 'hospital') {
      return NextResponse.redirect(new URL('/auth/hospital', req.url));
    }
    return NextResponse.next();
  }

  // ✅ Protect /dashboard/admin - requires token + role = admin
  if (pathname.startsWith('/dashboard/admin')) {
    if (!token || role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/admin', req.url));
    }
    return NextResponse.next();
  }

  // ✅ Protect onboarding/reset-password pages
  if (pathname.startsWith('/auth/hospital/onboarding')) {
    if (!token || role !== 'hospital') {
      return NextResponse.redirect(new URL('/auth/hospital', req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/auth/reset-password')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/user', req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/hospital/onboarding',
    '/auth/reset-password',
    '/auth',
  ],
};
