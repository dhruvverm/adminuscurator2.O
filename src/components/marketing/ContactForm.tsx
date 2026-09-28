"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact } from "@/app/actions/contact";
import { FormAlert, SelectField, SubmitButton, TextArea, TextField, useFormValidation } from "@/components/forms/Field";
import { track } from "@/lib/analytics";
import { checkEmail, checkPhone, checkRequired, collect, type FormState } from "@/lib/validation";

const SUBJECTS = [
  { value: "", label: "Select a subject…" },
  { value: "Sales inquiry", label: "Sales inquiry" },
  { value: "Product demo", label: "Request a demo" },
  { value: "Customer support", label: "Customer support" },
  { value: "Billing question", label: "Billing question" },
  { value: "Partnership", label: "Partnership" },
  { value: "Other", label: "Other" },
];

const validate = (d: FormData) =>
  collect({
    name: checkRequired(String(d.get("name") ?? "").trim(), "Full name", 2),
    email: checkEmail(String(d.get("email") ?? "").trim()),
    company: checkRequired(String(d.get("company") ?? "").trim(), "Company"),
    phone: checkPhone(String(d.get("phone") ?? "").trim()),
    subject: d.get("subject") ? null : "Please choose a subject.",
    message: checkRequired(String(d.get("message") ?? "").trim(), "Message", 10),
  });

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, { ok: false });
  const { errors, formProps } = useFormValidation(validate);
  const formRef = useRef<HTMLFormElement>(null);
  const all = { ...state.errors, ...errors };
  const v = state.values ?? {};

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      track("contact_submit");
    }
  }, [state]);

  const subject = SUBJECTS.some((s) => s.value === defaultSubject) ? defaultSubject : "";

  return (
    <form ref={formRef} action={action} className="form" {...formProps} aria-describedby="contact-status">
      <div id="contact-status" aria-live="polite">
        <FormAlert ok={state.ok} message={state.message} />
      </div>
      {/* Honeypot field — hidden from people and assistive tech */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px" }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-row">
        <TextField name="name" label="Full name" autoComplete="name" placeholder="Jane Smith" defaultValue={v.name} error={all.name} />
        <TextField name="email" label="Work email" type="email" autoComplete="email" placeholder="jane@company.com" defaultValue={v.email} error={all.email} />
      </div>
      <div className="form-row">
        <TextField name="company" label="Company" autoComplete="organization" placeholder="Company Inc." defaultValue={v.company} error={all.company} />
        <TextField name="phone" label="Phone number" type="tel" autoComplete="tel" optional placeholder="+1 (555) 000-0000" defaultValue={v.phone} error={all.phone} />
      </div>
      <SelectField name="subject" label="Subject" options={SUBJECTS} defaultValue={v.subject ?? subject} error={all.subject} key={v.subject ?? subject} />
      <TextArea name="message" label="Message" placeholder="Tell us a little about what you need…" rows={5} defaultValue={v.message} error={all.message} />
      <SubmitButton pending={pending}>Send Message</SubmitButton>
      <p className="field-hint center">
        By submitting this form you agree to our <a className="link" href="/legal/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
}
