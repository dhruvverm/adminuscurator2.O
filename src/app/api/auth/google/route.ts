import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { safeNext } from "@/lib/auth";
import { randomToken } from "@/lib/crypto";

/** Starts the Google OAuth 2.0 authorization-code flow. */
export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) redirect("/login");
  const next = safeNext(new URL(request.url).searchParams.get("next"));
  const state = randomToken(16);
  const jar = await cookies();
  const opts = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 600 };
  jar.set("oauth_state", state, opts);
  jar.set("oauth_next", next, opts);
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${siteConfig.url}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
