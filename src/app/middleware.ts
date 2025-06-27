// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = ['/', '/auth', '/_next', '/favicon.ico', '/api'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow all public paths
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ✅ Get cookie-based auth (admin/hospital) and session-based auth (user)
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;

  // ✅ /auth route – redirect if already logged in
  if (pathname === '/auth') {
    if (session) return NextResponse.redirect(new URL('/dashboard/user', req.url));
    if (token && role === 'hospital')
      return NextResponse.redirect(new URL('/dashboard/hospital', req.url));
    if (token && role === 'admin')
      return NextResponse.redirect(new URL('/dashboard/admin', req.url));
    return NextResponse.next(); // Otherwise show /auth
  }

  // ✅ User dashboard (NextAuth users)
  if (pathname.startsWith('/dashboard/user')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/user', req.url));
    }
  }

  // ✅ Hospital dashboard
  if (pathname.startsWith('/dashboard/hospital')) {
    if (!token || role !== 'hospital') {
      return NextResponse.redirect(new URL('/auth/hospital', req.url));
    }
  }

  // ✅ Admin dashboard
  if (pathname.startsWith('/dashboard/admin')) {
    if (!token || role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/admin', req.url));
    }
  }

  // ✅ Onboarding (hospital only)
  if (pathname.startsWith('/auth/hospital/onboarding')) {
    if (!token || role !== 'hospital') {
      return NextResponse.redirect(new URL('/auth/hospital', req.url));
    }
  }

  // ✅ Reset-password (anyone with token)
  if (pathname.startsWith('/auth/reset-password')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/user', req.url));
    }
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
