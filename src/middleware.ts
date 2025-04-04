import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { auth } from "@/lib/auth";

export async function  middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = new URL(request.url);
  console.log("Session:", session);
  const protectedPaths = ["/cart", "/profile"];
  const isPathProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isPathProtected && !session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  const authRoutes = ["/auth/signin", "/register"];
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart","/profile","/checkout"],
};
