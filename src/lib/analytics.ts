/**
 * Conversion tracking. `track()` forwards events to whichever providers
 * are configured AND consented to (GA4, GTM dataLayer, Meta Pixel).
 * It is a safe no-op otherwise.
 *
 * Tracked events: cta_click, sign_up, select_plan, begin_checkout,
 * purchase, contact_submit.
 */
export type AnalyticsEvent =
  | "cta_click"
  | "sign_up"
  | "login"
  | "select_plan"
  | "begin_checkout"
  | "purchase"
  | "contact_submit"
  | "download";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const META_EVENTS: Partial<Record<AnalyticsEvent, string>> = {
  sign_up: "CompleteRegistration",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
  contact_submit: "Contact",
  select_plan: "AddToCart",
};

export const CONSENT_KEY = "cookie-consent";

export function hasAnalyticsConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  window.dataLayer?.push({ event, ...props });
  window.gtag?.("event", event, props);
  const meta = META_EVENTS[event];
  if (meta) window.fbq?.("track", meta, props);
  else window.fbq?.("trackCustom", event, props);
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, props);
}
