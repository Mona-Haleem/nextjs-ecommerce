import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth(async function middleware(req) {
  try {
    const { nextUrl } = req;
    const session = req.auth;
    const pathname = nextUrl.pathname;

    // Protected routes that require authentication
    const protectedPaths = ["/cart", "/profile", "/order"];
    const isProtected = protectedPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );

    // Redirect to login if trying to access protected route without session
    if (isProtected && !session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Auth routes (login/register)
    const authRoutes = ["/login", "/register"];
    const isAuthPage = authRoutes.includes(pathname);

    // Redirect to home if trying to access auth pages while logged in
    if (isAuthPage && session) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Allow the request to continue even if middleware fails
    return NextResponse.next();
  }
});

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };

export const config = {
  matcher: ["/cart", "/profile", "/order/:id", "/login", "/register"],
};
