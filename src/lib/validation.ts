/** Tiny validation helpers shared by client forms and server actions. */

export type FieldErrors = Record<string, string>;

export interface FormState {
  ok: boolean;
  message?: string;
  errors?: FieldErrors;
  /** Echo of submitted values so fields keep their content after a server error. */
  values?: Record<string, string>;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function str(form: FormData, key: string, max = 5000): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function checkEmail(v: string): string | null {
  if (!v) return "Please enter your email address.";
  if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
  return null;
}

export function checkPassword(v: string): string | null {
  if (!v) return "Please enter a password.";
  if (v.length < 8) return "Use at least 8 characters.";
  if (!/[a-zA-Z]/.test(v) || !/\d/.test(v)) return "Include at least one letter and one number.";
  return null;
}

export function checkRequired(v: string, label: string, min = 1): string | null {
  if (!v) return `Please enter your ${label.toLowerCase()}.`;
  if (v.length < min) return `${label} should be at least ${min} characters.`;
  return null;
}

export function checkPhone(v: string): string | null {
  if (!v) return null; // optional
  return /^[+()\d\s.-]{7,20}$/.test(v) ? null : "Please enter a valid phone number.";
}

/** Collects non-null errors into an object. */
export function collect(checks: Record<string, string | null>): FieldErrors {
  return Object.fromEntries(Object.entries(checks).filter(([, v]) => v)) as FieldErrors;
}
