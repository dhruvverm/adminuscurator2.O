/**
 * Payment provider abstraction.
 *
 * Card details are NEVER collected or stored by this application —
 * customers are redirected to the provider's hosted, PCI-compliant
 * checkout page. To add another provider (Paddle, Lemon Squeezy,
 * Braintree…), implement `PaymentProvider` and return it below.
 */
import type { BillingInterval, Plan } from "@/content/types";
import type { Order } from "@/lib/store";
import { demoProvider } from "./demo";
import { stripeProvider } from "./stripe";

export interface CheckoutInput {
  order: Order;
  plan: Plan;
  interval: BillingInterval;
  customerEmail: string;
  successUrl: string; // may contain {ORDER_ID}
  cancelUrl: string;
}

export interface PaymentProvider {
  id: "stripe" | "demo";
  label: string;
  /** Returns the URL to send the customer to. */
  createCheckout(input: CheckoutInput): Promise<{ redirectUrl: string; providerRef?: string }>;
  /** Confirms payment when the customer returns (webhooks remain the source of truth). */
  confirm(order: Order, returnParams: Record<string, string | undefined>): Promise<boolean>;
}

export function getPaymentProvider(): PaymentProvider | null {
  if (process.env.STRIPE_SECRET_KEY) return stripeProvider;
  if (process.env.PAYMENTS_DEMO_MODE === "true" && process.env.NODE_ENV !== "production") return demoProvider;
  return null;
}
