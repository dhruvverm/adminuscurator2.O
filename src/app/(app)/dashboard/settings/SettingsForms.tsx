"use client";

import { useActionState } from "react";
import { changePassword, updateProfile } from "@/app/actions/account";
import { FormAlert, PasswordField, SubmitButton, TextField } from "@/components/forms/Field";
import type { FormState } from "@/lib/validation";

export function ProfileForm({ name, email }: { name: string; email: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateProfile, { ok: false });
  return (
    <form action={action} className="form">
      <FormAlert ok={state.ok} message={state.message} />
      <TextField name="name" label="Full name" defaultValue={name} error={state.errors?.name} autoComplete="name" />
      <TextField name="email" label="Email" defaultValue={email} disabled hint="Contact support to change your email." />
      <SubmitButton pending={pending} className="btn btn--primary">Save profile</SubmitButton>
    </form>
  );
}

export function PasswordForm({ hasPassword }: { hasPassword: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(changePassword, { ok: false });
  return (
    <form action={action} className="form">
      <FormAlert ok={state.ok} message={state.message} />
      {hasPassword && <PasswordField name="currentPassword" label="Current password" autoComplete="current-password" error={state.errors?.currentPassword} />}
      <PasswordField name="newPassword" label={hasPassword ? "New password" : "Set a password"} autoComplete="new-password" error={state.errors?.newPassword} hint="At least 8 characters, including a letter and a number." />
      <SubmitButton pending={pending} className="btn btn--primary">{hasPassword ? "Change password" : "Set password"}</SubmitButton>
    </form>
  );
}
