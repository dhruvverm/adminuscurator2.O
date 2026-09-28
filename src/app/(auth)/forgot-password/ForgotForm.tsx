"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/app/actions/auth";
import { FormAlert, SubmitButton, TextField, useFormValidation } from "@/components/forms/Field";
import { checkEmail, collect, type FormState } from "@/lib/validation";

const validate = (d: FormData) => collect({ email: checkEmail(String(d.get("email") ?? "").trim()) });

export function ForgotForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(requestPasswordReset, { ok: false });
  const { errors, formProps } = useFormValidation(validate);
  const all = { ...state.errors, ...errors };
  if (state.ok) {
    return (
      <div className="form">
        <FormAlert ok message={state.message} />
      </div>
    );
  }
  return (
    <form action={action} className="form" {...formProps}>
      <FormAlert ok={state.ok} message={state.message} />
      <TextField name="email" label="Email" type="email" autoComplete="email" placeholder="you@company.com" defaultValue={state.values?.email} error={all.email} />
      <SubmitButton pending={pending}>Send reset link</SubmitButton>
    </form>
  );
}
