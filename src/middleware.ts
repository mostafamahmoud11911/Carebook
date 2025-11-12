import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export interface UserJWT {
  id: number;
  email: string;
  role: "user" | "provider" | "admin";
  iat?: number;
  exp?: number;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  const publicPaths = ["/login", "/register"];
  const protectedPaths = [
    "/dashboard",
    "/pending-approval",
    "/services",
    "/add-service",
    "/availability",
    "/add-availability",
    "/booking",
    "/users",
    "/add-user",
  ];

  if (publicPaths.includes(path) && token) {
    const user = jwtDecode(token) as UserJWT;

    if (user.role === "admin" || user.role === "provider") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (user.role === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (protectedPaths.includes(path) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  if (token) {
    const user = jwtDecode(token) as UserJWT;
    const forbiddenForProviders = ["/users", "/add-user"];


    if (
      (user.role === "admin" || user.role === "provider") &&
      path === "/" || path.startsWith("/serviceDetails")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (user.role === "provider" && forbiddenForProviders.includes(path)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (user.role === "user" && path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
