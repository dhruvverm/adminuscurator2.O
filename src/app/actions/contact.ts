"use server";

import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import { sendEmail } from "@/lib/email";
import { createMessage } from "@/lib/store";
import { checkEmail, checkPhone, checkRequired, collect, str, type FormState } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export async function submitContact(_prev: FormState, form: FormData): Promise<FormState> {
  const values = {
    name: str(form, "name", 120),
    email: str(form, "email", 200),
    company: str(form, "company", 160),
    phone: str(form, "phone", 40),
    subject: str(form, "subject", 160),
    message: str(form, "message", 5000),
  };

  // Honeypot — real visitors never fill this hidden field.
  if (str(form, "website")) return { ok: true, message: "Thanks! Your message has been sent." };

  const errors = collect({
    name: checkRequired(values.name, "Full name", 2),
    email: checkEmail(values.email),
    company: checkRequired(values.company, "Company"),
    phone: checkPhone(values.phone),
    subject: checkRequired(values.subject, "Subject", 3),
    message: checkRequired(values.message, "Message", 10),
  });
  if (Object.keys(errors).length) {
    return { ok: false, message: "Please fix the highlighted fields.", errors, values };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60_000)) {
    return { ok: false, message: "You've sent several messages recently. Please try again in a few minutes.", values };
  }

  await createMessage(values);
  await sendEmail({
    to: siteConfig.contact.email,
    subject: `New contact form message: ${values.subject}`,
    text: `From: ${values.name} <${values.email}>\nCompany: ${values.company}\nPhone: ${values.phone || "—"}\n\n${values.message}`,
  });

  return { ok: true, message: "Thanks! Your message has been sent. We'll get back to you within one business day." };
}
