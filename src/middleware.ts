import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip check for login page
    if (request.nextUrl.pathname === "/admin/login") {
      if (session) {
        try {
            await decrypt(session);
            return NextResponse.redirect(new URL("/admin", request.url));
        } catch (e) {
            // invalid session, continue to login
        }
      }
      return NextResponse.next();
    }

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
