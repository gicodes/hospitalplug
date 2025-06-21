import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = ['/', '/auth', '/api', '/_next', '/favicon.ico'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();  // Skip public paths
  }

  // const isDashboardRoute = pathname.startsWith('/dashboard');

  // Check if user is logged in with next-auth (Google login)
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Custom token from localStorage or cookie for hospital/admin
  const token = req.cookies.get('token')?.value;

  // USER (Google Auth)
  if (pathname.startsWith('/dashboard/user')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/user', req.url));
    }
    return NextResponse.next();
  }

  // HOSPITAL (Custom Auth)
  if (pathname.startsWith('/dashboard/hospital')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/hospital', req.url));
    }
    return NextResponse.next();
  }

  // ADMIN (Custom Auth)
  if (pathname.startsWith('/dashboard/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/admin', req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};