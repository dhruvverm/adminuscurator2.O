import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic auth check: bounce visitors without a session cookie away
 * from private areas before rendering. Real authorization (signature,
 * roles) is enforced in layouts, pages and server actions.
 */
export function proxy(request: NextRequest) {
  if (!request.cookies.has("session")) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
