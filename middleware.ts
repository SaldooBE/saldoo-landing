import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();
  
  // Extract domain (handle localhost, vercel preview URLs, and production domains)
  const isLocalhost = hostname.includes('localhost');
  const isVercelPreview = hostname.includes('.vercel.app');
  const isSaldooBe = hostname === 'saldoo.be' || hostname === 'www.saldoo.be';
  const isAppSaldooBe = hostname === 'app.saldoo.be';
  
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
  
  // Production: saldoo.be (landing page domain)
  if (isSaldooBe) {
    // Block platform routes - redirect to landing page
    if (isPlatformRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Allow landing page and static assets
    return NextResponse.next();
  }
  
  // Production: app.saldoo.be (platform subdomain)
  if (isAppSaldooBe) {
    // Redirect root path to /start
    if (url.pathname === '/') {
      return NextResponse.redirect(new URL('/start', request.url));
    }
    // Allow platform routes
    return NextResponse.next();
  }
  
  // Development/Preview: Allow both landing page and platform routes
  // This allows developers to test both on localhost and Vercel preview URLs
  if (isLocalhost || isVercelPreview) {
    // If accessing platform route, allow it
    if (isPlatformRoute) {
      return NextResponse.next();
    }
    // If accessing root on preview, show landing page (for testing)
    // Platform routes will work normally
    return NextResponse.next();
  }
  
  // Default: allow the request (fallback)
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


