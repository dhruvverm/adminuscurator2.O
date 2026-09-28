import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { createSession, safeNext } from "@/lib/auth";
import { safeEqual } from "@/lib/crypto";
import { createUser, findUserByEmail, mutate, type User } from "@/lib/store";

interface GoogleProfile {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const jar = await cookies();
  const expected = jar.get("oauth_state")?.value;
  const next = safeNext(jar.get("oauth_next")?.value);
  jar.delete("oauth_state");
  jar.delete("oauth_next");

  if (!code || !state || !expected || !safeEqual(state, expected)) redirect("/login?error=oauth");

  let profile: GoogleProfile;
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${siteConfig.url}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });
    const tokens = await tokenRes.json();
    if (!tokenRes.ok || !tokens.access_token) throw new Error("token exchange failed");
    const infoRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
      cache: "no-store",
    });
    profile = await infoRes.json();
    if (!infoRes.ok || !profile.email || !profile.email_verified) throw new Error("unverified email");
  } catch (err) {
    console.error("[oauth] google", err);
    redirect("/login?error=oauth");
  }

  // Link to an existing account by verified email, or create a new one.
  let user: User | null = await findUserByEmail(profile.email);
  if (user) {
    if (!user.googleId) {
      const id = user.id;
      await mutate((data) => {
        const u = data.users.find((x) => x.id === id);
        if (u) u.googleId = profile.sub;
      });
    }
  } else {
    user = await createUser({ email: profile.email, name: profile.name || profile.email.split("@")[0], passwordHash: null, googleId: profile.sub });
  }

  await createSession(user);
  jar.set("signed_in", "1", { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  redirect(next);
}
