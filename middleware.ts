import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Allowlist for Next.js internals and static assets
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internals, API routes that you may still need, and the coming-soon page itself
  const isInternal =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml');

  const isPublicAsset = PUBLIC_FILE.test(pathname);
  const isComingSoon = pathname.startsWith('/coming-soon');

  if (isInternal || isPublicAsset || isComingSoon) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/coming-soon';
  return NextResponse.rewrite(url);
}

export const config = {
  // Apply to all paths
  matcher: '/:path*',
};


