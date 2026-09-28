/**
 * Session management: a stateless, HMAC-signed, httpOnly cookie.
 * Sessions are invalidated by bumping `user.sessionVersion`.
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hmac, safeEqual } from "./crypto";
import { findUserById, type Role, type User } from "./store";

export const SESSION_COOKIE = "session";
const SESSION_DAYS = 30;

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set (at least 16 characters) in production.");
  }
  return "dev-only-insecure-secret-change-me";
}

interface SessionPayload {
  uid: string;
  v: number;
  exp: number;
}

function sign(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${hmac(secret(), body)}`;
}

function unsign(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig || !safeEqual(sig, hmac(secret(), body))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    return payload.exp > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

export async function createSession(user: Pick<User, "id" | "sessionVersion">) {
  const exp = Date.now() + SESSION_DAYS * 86_400_000;
  const jar = await cookies();
  jar.set(SESSION_COOKIE, sign({ uid: user.id, v: user.sessionVersion, exp }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(exp),
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export type SafeUser = Omit<User, "passwordHash">;

function toSafe(user: User): SafeUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...safe } = user;
  return safe;
}

/** Returns the signed-in user or null. */
export async function getCurrentUser(): Promise<SafeUser | null> {
  const payload = unsign((await cookies()).get(SESSION_COOKIE)?.value);
  if (!payload) return null;
  const user = await findUserById(payload.uid);
  if (!user || user.sessionVersion !== payload.v) return null;
  return toSafe(user);
}

/** Only allow same-site relative redirects (prevents open redirects). */
export function safeNext(next: string | null | undefined, fallback = "/dashboard"): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}

export async function requireUser(next = "/dashboard"): Promise<SafeUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  return user;
}

/** Role hierarchy: admin ⊃ editor ⊃ customer. */
const rank: Record<Role, number> = { customer: 0, editor: 1, admin: 2 };

export function hasRole(user: Pick<User, "role"> | null, role: Role) {
  return !!user && rank[user.role] >= rank[role];
}

/** For admin pages: redirects when not signed in / not authorized. */
export async function requireRole(role: Role): Promise<SafeUser> {
  const user = await requireUser("/admin");
  if (!hasRole(user, role)) redirect("/dashboard?denied=1");
  return user;
}

/** For server actions: throws instead of redirecting. */
export async function assertRole(role: Role): Promise<SafeUser> {
  const user = await getCurrentUser();
  if (!hasRole(user, role)) throw new Error("FORBIDDEN");
  return user!;
}
