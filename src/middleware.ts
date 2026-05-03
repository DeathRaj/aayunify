import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip middleware for static assets, images, and the locked page itself
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/locked' ||
    pathname.includes('.') // matches images/scripts with extensions
  ) {
    return NextResponse.next();
  }

  // 2. Check for the access cookie
  const hasAccess = request.cookies.get('site-access')?.value === 'true';

  // 3. Redirect to /locked if no access
  if (!hasAccess) {
    const url = request.nextUrl.clone();
    url.pathname = '/locked';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
