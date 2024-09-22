// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req:any) {
  // Get the session token from the request
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // Check if the token exists
  if (!token) {
    // Redirect to the login page if the token is not available
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow the request to proceed if the token is valid
  return NextResponse.next();
}

// Specify the paths that need authentication
export const config = {
  matcher: ["/search/:path*", "/protected-route/:path*"], // Add routes that require authentication
};
