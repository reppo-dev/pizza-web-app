import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute =
    pathname.startsWith("/customer") || pathname.startsWith("/admin");

  if (!isPrivateRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("jwt")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
