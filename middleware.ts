import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();
  
  // Extract domain (handle localhost, vercel preview URLs, and production domains)
  const isLocalhost = hostname.includes('localhost');
  const isVercelPreview = hostname.includes('.vercel.app');
  const isSaldooBe = hostname === 'saldoo.be' || hostname === 'www.saldoo.be';
  const isAppSaldooBe = hostname === 'app.saldoo.be' || hostname.startsWith('app.saldoo.be');
  
  // Platform routes that should only be accessible on app.saldoo.be
  const platformRoutes = [
    '/start',
    '/upload',
    '/analyse',
    '/dashboard',
    '/facturatie',
    '/login',
    '/signup',
    '/api',
    '/auth',
  ];
  
  // Check if current path is a platform route
  const isPlatformRoute = platformRoutes.some(route => 
    url.pathname === route || url.pathname.startsWith(route + '/')
  );
  
  // If accessing saldoo.be (main domain)
  if (isSaldooBe || (!isAppSaldooBe && !isLocalhost && !isVercelPreview && !isPlatformRoute)) {
    // Block platform routes - redirect to landing page
    if (isPlatformRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Allow landing page and static assets
    return NextResponse.next();
  }
  
  // If accessing app.saldoo.be (platform subdomain)
  if (isAppSaldooBe || (isLocalhost && isPlatformRoute) || (isVercelPreview && isPlatformRoute)) {
    // Redirect root path to /start (or /login if not authenticated)
    if (url.pathname === '/') {
      return NextResponse.redirect(new URL('/start', request.url));
    }
    // Block landing page route - redirect to /start
    if (url.pathname === '/landing' || url.pathname === '/home') {
      return NextResponse.redirect(new URL('/start', request.url));
    }
    // Allow platform routes
    return NextResponse.next();
  }
  
  // Default: allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)',
  ],
};

