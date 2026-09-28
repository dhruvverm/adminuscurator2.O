"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { signup } from "@/app/actions/auth";
import { FormAlert, PasswordField, SubmitButton, TextField, useFormValidation } from "@/components/forms/Field";
import { track } from "@/lib/analytics";
import { checkEmail, checkPassword, checkRequired, collect, type FormState } from "@/lib/validation";

const validate = (d: FormData) => {
  const pw = String(d.get("password") ?? "");
  const confirm = String(d.get("confirmPassword") ?? "");
  return collect({
    name: checkRequired(String(d.get("name") ?? "").trim(), "Full name", 2),
    email: checkEmail(String(d.get("email") ?? "").trim()),
    password: checkPassword(pw),
    confirmPassword: !confirm ? "Please confirm your password." : confirm !== pw ? "Passwords don't match." : null,
    terms: d.get("terms") ? null : "Please accept the Terms of Service and Privacy Policy.",
  });
};

function score(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return pw ? Math.max(1, s) : 0;
}
const LABELS = ["", "Weak", "Fair", "Good", "Strong"];

export function SignupForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(signup, { ok: false });
  const { errors, formProps } = useFormValidation(validate);
  const [pw, setPw] = useState("");
  const all = { ...state.errors, ...errors };
  const s = score(pw);

  return (
    <form
      action={action}
      className="form"
      style={{ marginTop: 0 }}
      {...formProps}
      onSubmit={(e) => {
        formProps.onSubmit(e);
        if (!e.defaultPrevented) track("sign_up", { method: "email" });
      }}
    >
      <FormAlert ok={state.ok} message={state.message} />
      <input type="hidden" name="next" value={next} />
      <TextField name="name" label="Full name" autoComplete="name" placeholder="Jane Smith" defaultValue={state.values?.name} error={all.name} />
      <TextField name="email" label="Work email" type="email" autoComplete="email" placeholder="jane@company.com" defaultValue={state.values?.email} error={all.email} />
      <PasswordField
        name="password"
        label="Password"
        autoComplete="new-password"
        error={all.password}
        hint="At least 8 characters, including a letter and a number."
        onChange={(e) => setPw(e.target.value)}
      >
        {pw && (
          <div aria-live="polite">
            <div className="strength" data-score={s} aria-hidden="true">
              <i /><i /><i /><i />
            </div>
            <span className="field-hint">Password strength: {LABELS[s]}</span>
          </div>
        )}
      </PasswordField>
      <PasswordField name="confirmPassword" label="Confirm password" autoComplete="new-password" error={all.confirmPassword} />
      <div className="field">
        <label className="checkbox">
          <input type="checkbox" name="terms" aria-invalid={all.terms ? true : undefined} aria-describedby={all.terms ? "terms-error" : undefined} />
          <span>
            I agree to the <Link href="/legal/terms" target="_blank">Terms of Service</Link> and{" "}
            <Link href="/legal/privacy" target="_blank">Privacy Policy</Link>.
          </span>
        </label>
        {all.terms && <p className="field-error" id="terms-error" role="alert">{all.terms}</p>}
      </div>
      <SubmitButton pending={pending}>Create account</SubmitButton>
    </form>
  );
}
