"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import { createSession, destroySession, getCurrentUser, safeNext } from "@/lib/auth";
import { hashPassword, randomToken, sha256, verifyPassword } from "@/lib/crypto";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import {
  consumePasswordReset,
  createUser,
  findUserByEmail,
  savePasswordReset,
  updateUser,
} from "@/lib/store";
import { checkEmail, checkPassword, checkRequired, collect, str, type FormState } from "@/lib/validation";

/** Non-sensitive hint cookie so static pages can show "Dashboard" instead of "Login". */
async function setSignedInHint(on: boolean) {
  const jar = await cookies();
  if (on) jar.set("signed_in", "1", { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  else jar.delete("signed_in");
}

async function clientIp() {
  return (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function signup(_prev: FormState, form: FormData): Promise<FormState> {
  const name = str(form, "name", 120);
  const email = str(form, "email", 200).toLowerCase();
  const password = str(form, "password", 200);
  const confirm = str(form, "confirmPassword", 200);
  const terms = form.get("terms") === "on";
  const next = safeNext(str(form, "next"));
  const values = { name, email };

  const errors = collect({
    name: checkRequired(name, "Full name", 2),
    email: checkEmail(email),
    password: checkPassword(password),
    confirmPassword: !confirm ? "Please confirm your password." : confirm !== password ? "Passwords don't match." : null,
    terms: terms ? null : "Please accept the Terms of Service and Privacy Policy.",
  });
  if (Object.keys(errors).length) return { ok: false, errors, values };

  if (!rateLimit(`signup:${await clientIp()}`, 10, 60 * 60_000)) {
    return { ok: false, message: "Too many sign-up attempts. Please try again later.", values };
  }

  let user;
  try {
    user = await createUser({ name, email, passwordHash: await hashPassword(password) });
  } catch (e) {
    if ((e as Error).message === "EMAIL_TAKEN") {
      return { ok: false, errors: { email: "An account with this email already exists. Try signing in instead." }, values };
    }
    throw e;
  }
  await createSession(user);
  await setSignedInHint(true);
  redirect(`${next}${next.includes("?") ? "&" : "?"}welcome=1`);
}

export async function login(_prev: FormState, form: FormData): Promise<FormState> {
  const email = str(form, "email", 200).toLowerCase();
  const password = str(form, "password", 200);
  const next = safeNext(str(form, "next"));
  const values = { email };

  const errors = collect({ email: checkEmail(email), password: password ? null : "Please enter your password." });
  if (Object.keys(errors).length) return { ok: false, errors, values };

  if (!rateLimit(`login:${email}`, 8, 15 * 60_000) || !rateLimit(`login-ip:${await clientIp()}`, 30, 15 * 60_000)) {
    return { ok: false, message: "Too many sign-in attempts. Please wait a few minutes and try again.", values };
  }

  const user = await findUserByEmail(email);
  const valid = await verifyPassword(password, user?.passwordHash);
  if (!user || !valid) {
    return {
      ok: false,
      message: user && !user.passwordHash ? "This account uses Google sign-in. Continue with Google instead." : "Incorrect email or password.",
      values,
    };
  }
  await createSession(user);
  await setSignedInHint(true);
  const dest = user.role !== "customer" && next === "/dashboard" ? "/admin" : next;
  redirect(dest);
}

export async function logout() {
  await destroySession();
  await setSignedInHint(false);
  redirect("/");
}

/** Signs the user out of every device by rotating their session version. */
export async function logoutEverywhere() {
  const user = await getCurrentUser();
  if (user) await updateUser(user.id, (u) => void (u.sessionVersion += 1));
  await logout();
}

export async function requestPasswordReset(_prev: FormState, form: FormData): Promise<FormState> {
  const email = str(form, "email", 200).toLowerCase();
  const err = checkEmail(email);
  if (err) return { ok: false, errors: { email: err }, values: { email } };

  const generic: FormState = {
    ok: true,
    message: "If an account exists for that email, we've sent a link to reset your password. It expires in 1 hour.",
  };
  if (!rateLimit(`reset:${email}`, 3, 60 * 60_000)) return generic;

  const user = await findUserByEmail(email);
  if (user) {
    const token = randomToken();
    await savePasswordReset(user.id, sha256(token));
    await sendEmail({
      to: user.email,
      subject: `Reset your ${siteConfig.name} password`,
      text: `Hi ${user.name},\n\nUse the link below to set a new password. It expires in 1 hour.\n\n${siteConfig.url}/reset-password?token=${token}\n\nIf you didn't request this, you can ignore this email.`,
    });
  }
  // Same response either way, so the form can't be used to discover accounts.
  return generic;
}

export async function resetPassword(_prev: FormState, form: FormData): Promise<FormState> {
  const token = str(form, "token", 200);
  const password = str(form, "password", 200);
  const confirm = str(form, "confirmPassword", 200);
  const errors = collect({
    password: checkPassword(password),
    confirmPassword: confirm !== password ? "Passwords don't match." : null,
  });
  if (Object.keys(errors).length) return { ok: false, errors };

  const userId = token ? await consumePasswordReset(sha256(token)) : null;
  if (!userId) {
    return { ok: false, message: "This reset link is invalid or has expired. Please request a new one." };
  }
  const passwordHash = await hashPassword(password);
  const user = await updateUser(userId, (u) => {
    u.passwordHash = passwordHash;
    u.sessionVersion += 1; // sign out other sessions
  });
  await createSession(user);
  await setSignedInHint(true);
  redirect("/dashboard?reset=1");
}
