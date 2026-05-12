import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. مسیرهای خصوصی (نیاز به توکن دارند)
  const isPrivateRoute =
    pathname.startsWith("/customer") || pathname.startsWith("/admin");

  // 2. مسیرهای مربوط به احراز هویت (لاگین/ثبت‌نام)
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const token = request.cookies.get("jwt")?.value;

  // 3. اگر کاربر لاگین است و می‌خواهد به صفحه لاگین/ثبت‌نام برود → ببرش به خانه
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 4. اگر کاربر لاگین نیست و می‌خواهد به صفحه خصوصی برود → ببرش به لاگین
  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 5. بقیه موارد → اجازه عبور
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
