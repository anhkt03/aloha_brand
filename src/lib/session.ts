import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "aloha_admin_session";
const maxAge = 60 * 60 * 8;
const secret = process.env.AUTH_SESSION_SECRET;
if (!secret) throw new Error("AUTH_SESSION_SECRET must be configured.");
const sessionSecret: string = secret;

function sign(value: string) { return createHmac("sha256", sessionSecret).update(value).digest("base64url"); }

export async function getSessionUserId() {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return null;
  const [payload, signature] = value.split(".");
  const expected = payload ? sign(payload) : "";
  if (!payload || !signature || signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try { const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as { id: number; exp: number }; return parsed.exp > Date.now() && Number.isInteger(parsed.id) ? parsed.id : null; } catch { return null; }
}

export async function createSession(userId: number) {
  const payload = Buffer.from(JSON.stringify({ id: userId, exp: Date.now() + maxAge * 1000 })).toString("base64url");
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge });
}

export async function clearSession() { (await cookies()).delete(COOKIE); }
