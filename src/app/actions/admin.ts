"use server";

import { revalidatePath } from "next/cache";
import type { ManagedContent } from "@/content/types";
import { assertRole } from "@/lib/auth";
import { resetContent, saveContent, setMessageStatus, setOrderStatus, updateUser, type OrderStatus, type Role } from "@/lib/store";
import { sanitizeCollection } from "@/lib/admin-schema";

export type AdminResult = { ok: boolean; message: string };

/** Editors and admins can manage marketing content. */
export async function saveCollection(key: keyof ManagedContent, json: string): Promise<AdminResult> {
  await assertRole("editor");
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, message: "Could not read the submitted data." };
  }
  const result = sanitizeCollection(key, parsed);
  if (!result.ok) return { ok: false, message: result.error };
  await saveContent(key, result.value as never);
  revalidatePath("/", "layout");
  return { ok: true, message: "Changes saved and published." };
}

export async function resetCollection(key: keyof ManagedContent): Promise<AdminResult> {
  await assertRole("editor");
  await resetContent(key);
  revalidatePath("/", "layout");
  return { ok: true, message: "Restored the default content." };
}

export async function updateMessageStatus(id: string, status: "new" | "read" | "archived") {
  await assertRole("editor");
  await setMessageStatus(id, status);
  revalidatePath("/admin", "layout");
}

/** Orders and user roles are admin-only. */
export async function updateOrderStatus(id: string, status: OrderStatus) {
  await assertRole("admin");
  await setOrderStatus(id, status);
  revalidatePath("/admin", "layout");
}

export async function updateUserRole(id: string, role: Role) {
  const me = await assertRole("admin");
  if (id === me.id) throw new Error("You can't change your own role.");
  if (!["customer", "editor", "admin"].includes(role)) throw new Error("Invalid role");
  await updateUser(id, (u) => {
    u.role = role;
    u.sessionVersion += 1; // force re-login with new permissions
  });
  revalidatePath("/admin", "layout");
}
