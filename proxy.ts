import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function proxy(req: NextRequest) {
  const store = await cookies();
  const token = store.get("better-auth.session_token");

  if (!token && req.url.includes("admin")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (token && !req.url.includes("admin")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/*).*)"],
};
