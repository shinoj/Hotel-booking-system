import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get session from cookies
  const sessionCookie = request.cookies.get("session")
  const session = sessionCookie ? JSON.parse(sessionCookie.value) : null

  // Check if user is authenticated
  const isAuthenticated = !!session

  // Check if user is admin
  const isAdmin = isAuthenticated && session.user.role === "admin"

  // Protect admin routes
  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Protect user dashboard routes
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Protect booking routes
  if (pathname.startsWith("/bookings") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/bookings/:path*"],
}

