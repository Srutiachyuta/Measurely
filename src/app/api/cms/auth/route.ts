import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cmsConfigured, createSession, requireCms, sameOrigin, SESSION_COOKIE, SESSION_SECONDS, validPassword } from "@/cms/lib/server-auth";

let failures = 0;
let blockedUntil = 0;

export async function GET() {
  const denied = await requireCms();
  return denied ?? NextResponse.json({ authenticated: true }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  if (!cmsConfigured()) return NextResponse.json({ error: "CMS is disabled. Configure CMS_PASSWORD and CMS_SESSION_SECRET on the server." }, { status: 503 });
  if (Date.now() < blockedUntil) return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429, headers: { "Retry-After": "60" } });
  try {
    const body = await request.text();
    if (body.length > 1024) return NextResponse.json({ error: "Invalid sign-in request." }, { status: 400 });
    const { password } = JSON.parse(body);
    if (typeof password !== "string" || !validPassword(password)) {
      failures += 1;
      if (failures >= 5) { blockedUntil = Date.now() + 60_000; failures = 0; }
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
    failures = 0;
    (await cookies()).set(SESSION_COOKIE, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/api/cms", maxAge: SESSION_SECONDS });
    return NextResponse.json({ authenticated: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Invalid sign-in request." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  (await cookies()).set(SESSION_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/api/cms", maxAge: 0 });
  return NextResponse.json({ authenticated: false }, { headers: { "Cache-Control": "no-store" } });
}
