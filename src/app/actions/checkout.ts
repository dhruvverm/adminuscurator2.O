"use server";

import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";
import type { BillingInterval } from "@/content/types";
import { getCurrentUser } from "@/lib/auth";
import { getPlan } from "@/lib/content";
import { getPaymentProvider } from "@/lib/payments";
import { createOrder, mutate } from "@/lib/store";
import { checkRequired, collect, str, type FormState } from "@/lib/validation";

export async function startCheckout(_prev: FormState, form: FormData): Promise<FormState> {
  const user = await getCurrentUser();
  const planId = str(form, "plan", 60);
  const interval: BillingInterval = str(form, "interval") === "yearly" ? "yearly" : "monthly";
  if (!user) redirect(`/login?next=${encodeURIComponent(`/checkout?plan=${planId}&interval=${interval}`)}`);

  const billing = {
    name: str(form, "billingName", 120),
    company: str(form, "billingCompany", 160),
    country: str(form, "country", 80),
    taxId: str(form, "taxId", 60),
  };
  const values = { ...billing, plan: planId, interval };

  const errors = collect({
    billingName: checkRequired(billing.name, "Billing name", 2),
    country: billing.country ? null : "Please select your country.",
  });
  if (Object.keys(errors).length) return { ok: false, errors, values };

  const plan = await getPlan(planId);
  if (!plan || plan.kind !== "self-serve") {
    return { ok: false, message: "Please choose a plan to continue.", values };
  }

  const provider = getPaymentProvider();
  if (!provider) {
    return {
      ok: false,
      message: "Online payments aren't available yet. Please contact our sales team to get started.",
      values,
    };
  }

  const order = await createOrder({
    userId: user.id,
    email: user.email,
    planId: plan.id,
    planName: plan.name,
    interval,
    amount: interval === "yearly" ? plan.priceYearly : plan.priceMonthly,
    currency: plan.currency,
    provider: provider.id,
    billing,
  });

  let redirectUrl: string;
  try {
    const result = await provider.createCheckout({
      order,
      plan,
      interval,
      customerEmail: user.email,
      successUrl: `${siteConfig.url}/checkout/success?order={ORDER_ID}`,
      cancelUrl: `${siteConfig.url}/checkout?plan=${plan.id}&interval=${interval}&cancelled=1`,
    });
    redirectUrl = result.redirectUrl;
    if (result.providerRef) {
      await mutate((data) => {
        const o = data.orders.find((x) => x.id === order.id);
        if (o) o.providerRef = result.providerRef;
      });
    }
  } catch (err) {
    console.error("[checkout] provider error", err);
    await mutate((data) => {
      const o = data.orders.find((x) => x.id === order.id);
      if (o) o.status = "failed";
    });
    return { ok: false, message: "We couldn't start the payment. Please try again or contact support.", values };
  }

  redirect(redirectUrl);
}
