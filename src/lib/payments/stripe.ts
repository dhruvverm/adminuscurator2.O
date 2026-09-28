/**
 * Stripe Checkout via the REST API (no SDK dependency).
 * Configure STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET and one Price ID
 * per plan/interval, e.g. STRIPE_PRICE_PROFESSIONAL_MONTHLY.
 */
import { hmac, safeEqual } from "@/lib/crypto";
import type { PaymentProvider } from "./index";

const API = "https://api.stripe.com/v1";

async function stripe<T>(path: string, init: { method?: string; body?: URLSearchParams } = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: init.body,
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Stripe error: ${json?.error?.message ?? res.status}`);
  return json as T;
}

export function stripePriceId(planId: string, interval: string) {
  return process.env[`STRIPE_PRICE_${planId.toUpperCase()}_${interval.toUpperCase()}`];
}

export const stripeProvider: PaymentProvider = {
  id: "stripe",
  label: "Secure checkout by Stripe",

  async createCheckout({ order, plan, interval, customerEmail, successUrl, cancelUrl }) {
    const price = stripePriceId(plan.id, interval);
    if (!price) throw new Error(`Missing Stripe price for ${plan.id}/${interval}`);
    const body = new URLSearchParams({
      mode: "subscription",
      "line_items[0][price]": price,
      "line_items[0][quantity]": "1",
      customer_email: customerEmail,
      client_reference_id: order.id,
      "metadata[orderId]": order.id,
      "subscription_data[metadata][orderId]": order.id,
      allow_promotion_codes: "true",
      billing_address_collection: "auto",
      "tax_id_collection[enabled]": "true",
      success_url: successUrl.replace("{ORDER_ID}", order.id) + "&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: cancelUrl,
    });
    const session = await stripe<{ id: string; url: string }>("/checkout/sessions", { method: "POST", body });
    return { redirectUrl: session.url, providerRef: session.id };
  },

  async confirm(order, params) {
    const sessionId = params.session_id;
    if (!sessionId || (order.providerRef && order.providerRef !== sessionId)) return false;
    const session = await stripe<{ payment_status: string; client_reference_id: string }>(
      `/checkout/sessions/${encodeURIComponent(sessionId)}`,
    );
    return session.client_reference_id === order.id && session.payment_status === "paid";
  },
};

/** Verifies the `Stripe-Signature` header (v1 scheme, 5-minute tolerance). */
export function verifyStripeSignature(payload: string, header: string | null, secret: string) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = Number(parts.t);
  if (!t || Math.abs(Date.now() / 1000 - t) > 300) return false;
  const expected = hmac(secret, `${t}.${payload}`, "hex");
  return header
    .split(",")
    .filter((p) => p.startsWith("v1="))
    .some((p) => safeEqual(p.slice(3), expected));
}
