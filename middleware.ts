import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protected paths under /admin
  const isAdminPath = path.startsWith("/admin");
  const isLoginPath = path === "/admin/login";

  if (isAdminPath && !isLoginPath) {
    const token = request.cookies.get("admin_token")?.value;
    
    // If there's no token, redirect to login
    if (token !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // If trying to access login page while authenticated, redirect to admin dashboard
  if (isLoginPath) {
    const token = request.cookies.get("admin_token")?.value;
    if (token === "authenticated") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
