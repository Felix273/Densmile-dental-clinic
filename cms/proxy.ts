import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const FALLBACK_SECRET = "densmile_super_secret_session_jwt_key_2026_xyz!";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("cms_session")?.value;
  let ok = false;

  if (token) {
    try {
      const secret = process.env.SESSION_SECRET || FALLBACK_SECRET;
      await jwtVerify(token, new TextEncoder().encode(secret));
      ok = true;
    } catch (err) {
      console.warn("JWT verification failed:", err);
    }
  }

  if (!ok) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const middleware = proxy;

export const config = { matcher: ["/admin/:path*"] };
