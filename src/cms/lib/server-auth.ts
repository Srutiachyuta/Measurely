import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "measurely_cms_session";
export const SESSION_SECONDS = 60 * 60 * 8;

export function cmsConfigured() {
  return (process.env.CMS_PASSWORD?.length ?? 0) >= 16 && (process.env.CMS_SESSION_SECRET?.length ?? 0) >= 32;
}

function signature(payload: string) {
  return createHmac("sha256", process.env.CMS_SESSION_SECRET!).update(`${process.env.CMS_PASSWORD}:${payload}`).digest("base64url");
}

export function validPassword(password: string) {
  if (!cmsConfigured()) return false;
  const supplied = createHash("sha256").update(password).digest();
  const expected = createHash("sha256").update(process.env.CMS_PASSWORD!).digest();
  return timingSafeEqual(supplied, expected);
}

export function createSession() {
  const payload = `${Math.floor(Date.now() / 1000) + SESSION_SECONDS}.${randomBytes(24).toString("base64url")}`;
  return `${payload}.${signature(payload)}`;
}

export function validSession(token?: string) {
  if (!cmsConfigured() || !token || token.length > 256) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const expiry = Number(parts[0]);
  const now = Math.floor(Date.now() / 1000);
  if (!Number.isInteger(expiry) || expiry <= now || expiry > now + SESSION_SECONDS) return false;
  const expected = Buffer.from(signature(`${parts[0]}.${parts[1]}`));
  const supplied = Buffer.from(parts[2]);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export function sameOrigin(request: Request) {
  return request.headers.get("origin") === (process.env.CMS_ORIGIN || new URL(request.url).origin);
}

export async function requireCms(request?: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!cmsConfigured()) return NextResponse.json({ error: "CMS is disabled. Configure server-only CMS credentials." }, { status: 503, headers });
  if (!validSession((await cookies()).get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Please sign in again." }, { status: 401, headers });
  if (request && !["GET", "HEAD"].includes(request.method) && !sameOrigin(request)) return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403, headers });
  return null;
}
