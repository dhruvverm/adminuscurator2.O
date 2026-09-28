"use server";

import { revalidatePath } from "next/cache";
import { createSession, getCurrentUser } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/crypto";
import { findUserById, updateUser } from "@/lib/store";
import { checkPassword, checkRequired, collect, str, type FormState } from "@/lib/validation";

export async function updateProfile(_prev: FormState, form: FormData): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "Please sign in again." };
  const name = str(form, "name", 120);
  const err = checkRequired(name, "Full name", 2);
  if (err) return { ok: false, errors: { name: err } };
  await updateUser(user.id, (u) => void (u.name = name));
  revalidatePath("/dashboard", "layout");
  return { ok: true, message: "Profile updated." };
}

export async function changePassword(_prev: FormState, form: FormData): Promise<FormState> {
  const session = await getCurrentUser();
  if (!session) return { ok: false, message: "Please sign in again." };
  const user = await findUserById(session.id);
  const current = str(form, "currentPassword", 200);
  const next = str(form, "newPassword", 200);
  const errors = collect({
    currentPassword: user?.passwordHash && !current ? "Please enter your current password." : null,
    newPassword: checkPassword(next),
  });
  if (Object.keys(errors).length) return { ok: false, errors };
  if (user?.passwordHash && !(await verifyPassword(current, user.passwordHash))) {
    return { ok: false, errors: { currentPassword: "That password is incorrect." } };
  }
  const passwordHash = await hashPassword(next);
  const updated = await updateUser(session.id, (u) => {
    u.passwordHash = passwordHash;
    u.sessionVersion += 1; // sign out other devices
  });
  await createSession(updated);
  return { ok: true, message: "Password changed. Other devices have been signed out." };
}
