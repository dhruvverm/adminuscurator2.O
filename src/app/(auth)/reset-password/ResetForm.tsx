"use client";

import { useActionState } from "react";
import { resetPassword } from "@/app/actions/auth";
import { FormAlert, PasswordField, SubmitButton, useFormValidation } from "@/components/forms/Field";
import { checkPassword, collect, type FormState } from "@/lib/validation";

const validate = (d: FormData) =>
  collect({
    password: checkPassword(String(d.get("password") ?? "")),
    confirmPassword: d.get("confirmPassword") !== d.get("password") ? "Passwords don't match." : null,
  });

export function ResetForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(resetPassword, { ok: false });
  const { errors, formProps } = useFormValidation(validate);
  const all = { ...state.errors, ...errors };
  return (
    <form action={action} className="form" {...formProps}>
      <FormAlert ok={state.ok} message={state.message} />
      <input type="hidden" name="token" value={token} />
      <PasswordField name="password" label="New password" autoComplete="new-password" error={all.password} hint="At least 8 characters, including a letter and a number." />
      <PasswordField name="confirmPassword" label="Confirm new password" autoComplete="new-password" error={all.confirmPassword} />
      <SubmitButton pending={pending}>Update password</SubmitButton>
    </form>
  );
}
