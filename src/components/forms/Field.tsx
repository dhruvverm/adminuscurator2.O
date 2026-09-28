"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

type Common = {
  name: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
};

function Wrapper({ name, label, error, hint, optional, children }: Common & { children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label} {optional && <span className="optional">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p className="field-error" id={`${name}-error`} role="alert">
          <Icon name="helpCircle" size={14} />
          {error}
        </p>
      ) : hint ? (
        <p className="field-hint" id={`${name}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(name: string, error?: string, hint?: ReactNode) {
  return error ? `${name}-error` : hint ? `${name}-hint` : undefined;
}

export function TextField({
  name,
  label,
  error,
  hint,
  optional,
  ...input
}: Common & Omit<InputHTMLAttributes<HTMLInputElement>, "name">) {
  return (
    <Wrapper name={name} label={label} error={error} hint={hint} optional={optional}>
      <input
        id={name}
        name={name}
        className="input"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        required={!optional}
        {...input}
      />
    </Wrapper>
  );
}

export function PasswordField({
  name,
  label,
  error,
  hint,
  children,
  ...input
}: Common & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type"> & { children?: ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <Wrapper name={name} label={label} error={error} hint={hint}>
      <div className="input-group">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          className="input"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, error, hint)}
          required
          {...input}
        />
        <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show}>
          <Icon name={show ? "eyeOff" : "eye"} size={18} />
        </button>
      </div>
      {children}
    </Wrapper>
  );
}

export function TextArea({
  name,
  label,
  error,
  hint,
  optional,
  ...input
}: Common & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  return (
    <Wrapper name={name} label={label} error={error} hint={hint} optional={optional}>
      <textarea
        id={name}
        name={name}
        className="textarea"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        required={!optional}
        {...input}
      />
    </Wrapper>
  );
}

export function SelectField({
  name,
  label,
  error,
  hint,
  optional,
  options,
  ...input
}: Common & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name"> & { options: { value: string; label: string }[] }) {
  return (
    <Wrapper name={name} label={label} error={error} hint={hint} optional={optional}>
      <select
        id={name}
        name={name}
        className="select"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        required={!optional}
        {...input}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function FormAlert({ ok, message }: { ok?: boolean; message?: string }) {
  if (!message) return null;
  return (
    <div className={`alert ${ok ? "alert--success" : "alert--error"}`} role={ok ? "status" : "alert"}>
      <Icon name={ok ? "checkCircle" : "helpCircle"} size={18} />
      <span>{message}</span>
    </div>
  );
}

export function SubmitButton({
  pending,
  children,
  className = "btn btn--primary btn--lg btn--block",
  disabled = false,
}: {
  pending: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button type="submit" className={className} disabled={pending || disabled} aria-busy={pending}>
      {pending ? (
        <>
          <span className="spinner" aria-hidden="true" /> Please wait…
        </>
      ) : (
        children
      )}
    </button>
  );
}

/**
 * Client-side validation helper. Runs `validate` on submit (blocking the
 * server round-trip when invalid) and re-validates touched fields on blur.
 * Server-returned errors are merged in by the caller.
 */
export function useFormValidation(validate: (data: FormData) => Record<string, string>) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const found = validate(new FormData(e.currentTarget));
    setErrors(found);
    if (Object.keys(found).length) {
      e.preventDefault();
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement;
    if (!target.name) return;
    const found = validate(new FormData(e.currentTarget));
    setErrors((prev) => {
      const next = { ...prev };
      if (found[target.name] && target.value) next[target.name] = found[target.name];
      else delete next[target.name];
      return next;
    });
  };

  return { errors, setErrors, formProps: { onSubmit, onBlur, noValidate: true } };
}
