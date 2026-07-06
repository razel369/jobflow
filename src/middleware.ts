import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lightweight route protection: redirect /dashboard/* to /login
 * if no `jobflow_session` cookie is present.
 * Server-side queries run from the page itself.
 */
const SESSION_COOKIE = "jobflow_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE);

  // Protected dashboard routes
  if (pathname.startsWith("/dashboard") && !sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("return", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};