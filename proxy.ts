import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function proxy(req: NextRequest) {
  const store = await cookies();
  const token = (await store).get("better-auth.session_token");
  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/*).*)"],
};
