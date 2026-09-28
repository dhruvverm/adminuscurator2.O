"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { isStaticSite, siteConfig } from "@/config/site";
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

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

/**
 * Static-site submission (no server): posts to a form service such as
 * Formspree when NEXT_PUBLIC_FORM_ENDPOINT is set, otherwise opens the
 * visitor's email app with the message pre-filled.
 */
async function submitStatic(_prev: FormState, form: FormData): Promise<FormState> {
  if (form.get("website")) return { ok: true, message: "Thanks! Your message has been sent." };
  if (FORM_ENDPOINT) {
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: form, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      return { ok: true, message: "Thanks! Your message has been sent. We'll get back to you within one business day." };
    } catch {
      return { ok: false, message: `Sorry, the message couldn't be sent. Please email us at ${siteConfig.contact.email}.` };
    }
  }
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const body = `${get("message")}\n\n— ${get("name")}\n${get("company")}\n${get("email")}${get("phone") ? `\n${get("phone")}` : ""}`;
  window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(get("subject"))}&body=${encodeURIComponent(body)}`;
  return { ok: true, message: `Your email app should now open with your message. If it doesn't, email us at ${siteConfig.contact.email}.` };
}

const SUBJECT_PARAMS: Record<string, string> = { sales: "Sales inquiry", demo: "Product demo", support: "Customer support" };

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(isStaticSite ? submitStatic : submitContact, { ok: false });
  // Pre-select the subject from ?subject=… on the client, so the page stays static.
  const [defaultSubject, setDefaultSubject] = useState("");
  useEffect(() => {
    setDefaultSubject(SUBJECT_PARAMS[new URLSearchParams(window.location.search).get("subject") ?? ""] ?? "");
  }, []);
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
        By submitting this form you agree to our <Link className="link" href="/legal/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
