/**
 * Field definitions for admin-editable collections. Used by the admin
 * UI to render editors and by server actions to validate submissions.
 */
import { iconNames } from "@/components/ui/Icon";
import type { ManagedContent } from "@/content/types";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "select" | "list";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  /** number fields: empty input → null */
  nullable?: boolean;
  hint?: string;
  max?: number;
}

export interface CollectionDef {
  key: keyof ManagedContent;
  title: string;
  itemLabel: string;
  description: string;
  titleField: string;
  fields: FieldDef[];
  blank: () => Record<string, unknown>;
}

const id = (): FieldDef => ({ key: "id", label: "ID (unique, no spaces)", type: "text", required: true, max: 60 });

export const collections: Record<keyof ManagedContent, CollectionDef> = {
  features: {
    key: "features",
    title: "Features",
    itemLabel: "feature",
    description: "Feature cards shown on the home page and the Features page.",
    titleField: "title",
    fields: [
      id(),
      { key: "icon", label: "Icon", type: "select", options: iconNames, required: true },
      { key: "title", label: "Title", type: "text", required: true, max: 80 },
      { key: "description", label: "Description", type: "textarea", required: true, max: 300 },
      { key: "href", label: "“Learn more” link", type: "text", hint: "Optional, e.g. /features#automation", max: 200 },
    ],
    blank: () => ({ id: `feature-${Date.now().toString(36)}`, icon: "sparkles", title: "", description: "", href: "" }),
  },
  plans: {
    key: "plans",
    title: "Pricing plans",
    itemLabel: "plan",
    description:
      "Plans shown on the pricing page and used in checkout. Leave prices empty to display the placeholder label. Stripe Price IDs are configured via environment variables.",
    titleField: "name",
    fields: [
      id(),
      { key: "name", label: "Name", type: "text", required: true, max: 40 },
      { key: "tagline", label: "Tagline", type: "text", required: true, max: 120 },
      { key: "priceMonthly", label: "Monthly price", type: "number", nullable: true, hint: "Per month. Empty = placeholder" },
      { key: "priceYearly", label: "Yearly price (per month)", type: "number", nullable: true, hint: "Monthly equivalent when billed yearly" },
      { key: "priceLabel", label: "Placeholder / label", type: "text", required: true, hint: "Shown when no price, e.g. “$XX” or “Let's Talk”", max: 30 },
      { key: "currency", label: "Currency", type: "select", options: ["USD", "EUR", "GBP", "INR", "CAD", "AUD"], required: true },
      { key: "kind", label: "Plan type", type: "select", options: ["self-serve", "sales"], required: true, hint: "self-serve → checkout, sales → contact form" },
      { key: "cta", label: "Button label", type: "text", required: true, max: 30 },
      { key: "highlighted", label: "Highlight as featured", type: "boolean" },
      { key: "badge", label: "Badge", type: "text", hint: "e.g. Most Popular", max: 30 },
      { key: "features", label: "Included features (one per line)", type: "list", max: 120 },
    ],
    blank: () => ({
      id: `plan-${Date.now().toString(36)}`,
      name: "",
      tagline: "",
      priceMonthly: null,
      priceYearly: null,
      priceLabel: "$XX",
      currency: "USD",
      kind: "self-serve",
      cta: "Get Started",
      highlighted: false,
      badge: "",
      features: [],
    }),
  },
  testimonials: {
    key: "testimonials",
    title: "Testimonials",
    itemLabel: "testimonial",
    description: "Only publish genuine reviews you have permission to use. Keep “Sample” ticked for placeholders.",
    titleField: "name",
    fields: [
      id(),
      { key: "quote", label: "Quote", type: "textarea", required: true, max: 600 },
      { key: "name", label: "Customer name", type: "text", required: true, max: 80 },
      { key: "role", label: "Job title", type: "text", required: true, max: 80 },
      { key: "company", label: "Company", type: "text", required: true, max: 80 },
      { key: "avatar", label: "Avatar image URL", type: "text", hint: "Optional, e.g. /avatars/jane.jpg", max: 300 },
      { key: "isPlaceholder", label: "Sample / placeholder (labelled on site)", type: "boolean" },
    ],
    blank: () => ({ id: `t-${Date.now().toString(36)}`, quote: "", name: "", role: "", company: "", avatar: "", isPlaceholder: true }),
  },
  faqs: {
    key: "faqs",
    title: "FAQs",
    itemLabel: "question",
    description: "Questions shown on the home page and the FAQ page.",
    titleField: "question",
    fields: [
      id(),
      { key: "question", label: "Question", type: "text", required: true, max: 200 },
      { key: "answer", label: "Answer", type: "textarea", required: true, max: 1500 },
    ],
    blank: () => ({ id: `faq-${Date.now().toString(36)}`, question: "", answer: "" }),
  },
  software: {
    key: "software",
    title: "Downloads",
    itemLabel: "app",
    description:
      "Apps shown on the Downloads page. Leave a platform's URL empty if it isn't available — that option is then disabled instead of showing a broken link.",
    titleField: "name",
    fields: [
      id(),
      { key: "name", label: "Software name", type: "text", required: true, max: 80 },
      { key: "description", label: "Short description", type: "textarea", required: true, max: 240 },
      { key: "logo", label: "Logo image URL", type: "text", hint: "Optional, e.g. /brand/app-icon.svg. Empty = icon below", max: 300 },
      { key: "icon", label: "Icon (used when no logo)", type: "select", options: iconNames, required: true },
      { key: "version", label: "Version", type: "text", required: true, hint: "e.g. 2.4.1", max: 30 },
      { key: "fileSize", label: "File size", type: "text", hint: "Optional, e.g. 84 MB", max: 30 },
      { key: "releaseDate", label: "Release date", type: "text", hint: "YYYY-MM-DD", max: 10 },
      { key: "mobileUrl", label: "Mobile download URL", type: "text", hint: "App Store / Google Play link or file. Empty = unavailable", max: 500 },
      { key: "tabletUrl", label: "Tablet download URL", type: "text", hint: "Empty = unavailable", max: 500 },
      { key: "windowsUrl", label: "Windows download URL", type: "text", hint: "Empty = unavailable", max: 500 },
      { key: "macUrl", label: "macOS download URL", type: "text", hint: "Empty = unavailable", max: 500 },
      { key: "mobileSize", label: "Mobile file size", type: "text", hint: "Optional", max: 30 },
      { key: "tabletSize", label: "Tablet file size", type: "text", hint: "Optional", max: 30 },
      { key: "windowsSize", label: "Windows file size", type: "text", hint: "Optional", max: 30 },
      { key: "macSize", label: "macOS file size", type: "text", hint: "Optional", max: 30 },
      { key: "license", label: "License / usage rights", type: "text", hint: "e.g. Free to download and use", max: 120 },
      { key: "isPlaceholder", label: "Sample / placeholder (labelled on site)", type: "boolean" },
    ],
    blank: () => ({
      id: `app-${Date.now().toString(36)}`,
      name: "",
      description: "",
      logo: "",
      icon: "package",
      version: "1.0.0",
      fileSize: "",
      releaseDate: "",
      mobileUrl: "",
      tabletUrl: "",
      windowsUrl: "",
      macUrl: "",
      license: "Free to download and use",
      isPlaceholder: false,
    }),
  },
  products: {
    key: "products",
    title: "Products",
    itemLabel: "product",
    description: "The software products you sell.",
    titleField: "name",
    fields: [
      id(),
      { key: "name", label: "Name", type: "text", required: true, max: 80 },
      { key: "summary", label: "Summary", type: "textarea", required: true, max: 500 },
      { key: "status", label: "Status", type: "select", options: ["active", "draft"], required: true },
    ],
    blank: () => ({ id: `product-${Date.now().toString(36)}`, name: "", summary: "", status: "draft" }),
  },
};

/** Validates + normalizes a submitted collection against its field definitions. */
export function sanitizeCollection(
  key: keyof ManagedContent,
  input: unknown,
): { ok: true; value: Record<string, unknown>[] } | { ok: false; error: string } {
  const def = collections[key];
  if (!def) return { ok: false, error: "Unknown collection." };
  if (!Array.isArray(input)) return { ok: false, error: "Invalid data." };
  if (input.length > 100) return { ok: false, error: "Too many items." };

  const seen = new Set<string>();
  const out: Record<string, unknown>[] = [];
  for (const [i, raw] of input.entries()) {
    if (!raw || typeof raw !== "object") return { ok: false, error: `Item ${i + 1} is invalid.` };
    const item: Record<string, unknown> = {};
    for (const f of def.fields) {
      const v = (raw as Record<string, unknown>)[f.key];
      const label = `${def.itemLabel} ${i + 1}: “${f.label}”`;
      switch (f.type) {
        case "boolean":
          item[f.key] = v === true;
          break;
        case "number": {
          if (v === null || v === "" || v === undefined) {
            if (!f.nullable) return { ok: false, error: `${label} is required.` };
            item[f.key] = null;
          } else {
            const n = Number(v);
            if (!Number.isFinite(n) || n < 0) return { ok: false, error: `${label} must be a positive number.` };
            item[f.key] = Math.round(n * 100) / 100;
          }
          break;
        }
        case "list": {
          const arr = Array.isArray(v) ? v : typeof v === "string" ? v.split("\n") : [];
          item[f.key] = arr.map((s) => String(s).trim().slice(0, f.max ?? 200)).filter(Boolean).slice(0, 30);
          break;
        }
        default: {
          const s = typeof v === "string" ? v.trim().slice(0, f.max ?? 2000) : "";
          if (f.required && !s) return { ok: false, error: `${label} is required.` };
          if (f.type === "select" && s && !f.options?.includes(s)) return { ok: false, error: `${label} has an invalid value.` };
          if (f.key === "id" && !/^[a-z0-9-_]+$/i.test(s)) return { ok: false, error: `${label} may only contain letters, numbers, - and _.` };
          if ((f.key === "href" || f.key === "avatar" || f.key === "logo" || f.key.endsWith("Url")) && s && !/^(\/|https:\/\/)/.test(s)) {
            return { ok: false, error: `${label} must start with / or https://` };
          }
          if (f.key === "releaseDate" && s && !/^\d{4}-\d{2}-\d{2}$/.test(s)) return { ok: false, error: `${label} must be in YYYY-MM-DD format.` };
          item[f.key] = s || (f.required ? s : undefined);
        }
      }
    }
    const itemId = String(item.id);
    if (seen.has(itemId)) return { ok: false, error: `Duplicate ID “${itemId}”. Each item needs a unique ID.` };
    seen.add(itemId);
    out.push(item);
  }
  if (key === "plans" && out.length === 0) return { ok: false, error: "Keep at least one plan." };
  return { ok: true, value: out };
}
