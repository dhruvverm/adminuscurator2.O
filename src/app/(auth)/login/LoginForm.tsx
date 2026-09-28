"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { FormAlert, PasswordField, SubmitButton, TextField, useFormValidation } from "@/components/forms/Field";
import { checkEmail, collect, type FormState } from "@/lib/validation";

const validate = (d: FormData) =>
  collect({
    email: checkEmail(String(d.get("email") ?? "").trim()),
    password: d.get("password") ? null : "Please enter your password.",
  });

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(login, { ok: false });
  const { errors, formProps } = useFormValidation(validate);
  const all = { ...state.errors, ...errors };
  return (
    <form action={action} className="form" style={{ marginTop: 0 }} {...formProps}>
      <FormAlert ok={state.ok} message={state.message} />
      <input type="hidden" name="next" value={next} />
      <TextField name="email" label="Email" type="email" autoComplete="email" placeholder="you@company.com" defaultValue={state.values?.email} error={all.email} />
      <PasswordField
        name="password"
        label="Password"
        autoComplete="current-password"
        error={all.password}
        hint={<Link href="/forgot-password" className="link" style={{ fontSize: "0.8125rem" }}>Forgot your password?</Link>}
      />
      <SubmitButton pending={pending}>Log in</SubmitButton>
    </form>
  );
}
