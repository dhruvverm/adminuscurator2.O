import type { IconName } from "@/components/ui/Icon";

export type BillingInterval = "monthly" | "yearly";

export interface Feature {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  /** Optional link for "Learn more". */
  href?: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  /**
   * Prices in whole currency units. `null` = not yet set → the
   * `priceLabel` placeholder (e.g. "$XX") is displayed instead.
   */
  priceMonthly: number | null;
  priceYearly: number | null; // price per month when billed yearly
  priceLabel: string;
  currency: string;
  /** "self-serve" plans go through checkout; "sales" plans go to Contact Sales. */
  kind: "self-serve" | "sales";
  cta: string;
  highlighted: boolean;
  badge?: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  /** Keep true until replaced with a genuine, approved customer review. */
  isPlaceholder: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  summary: string;
  status: "active" | "draft";
}

/** Content that administrators can edit from /admin. */
export interface ManagedContent {
  features: Feature[];
  plans: Plan[];
  testimonials: Testimonial[];
  faqs: Faq[];
  products: Product[];
}
