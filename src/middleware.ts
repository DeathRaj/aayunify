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

  // 4. Edge Personalization: Read the wellness goal and attach it as a header
  // This allows Server Components to read user preferences without client-side flickering.
  const response = NextResponse.next();
  const wellnessGoal = request.cookies.get('wellness_goal')?.value;
  
  if (wellnessGoal) {
    // We clone the headers from the request so the route handler sees them
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-goal', wellnessGoal);
    
    // Future-proofing for ML Scaffold:
    // If you had a JWT, you could verify it here at the Edge (using jose or similar)
    // and inject `x-user-id` to pass to a Python ML microservice via API routes.
    // e.g. requestHeaders.set('x-user-id', verifiedToken.uid);

    return NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });
  }

  return response;
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
