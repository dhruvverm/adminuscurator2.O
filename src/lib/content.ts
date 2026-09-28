import { defaultManagedContent } from "@/content/managed-defaults";
import type { BillingInterval, ManagedContent, Plan } from "@/content/types";
import { read } from "./store";

/** Admin-edited content, falling back to the defaults in /src/content. */
export async function getContent(): Promise<ManagedContent> {
  const { content } = await read();
  return { ...defaultManagedContent, ...content };
}

export async function getPlans() {
  return (await getContent()).plans;
}

export async function getPlan(id: string | undefined | null): Promise<Plan | null> {
  if (!id) return null;
  return (await getPlans()).find((p) => p.id === id) ?? null;
}

export function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

/** Display price for a plan + interval, e.g. "$29" or the "$XX" placeholder. */
export function planPrice(plan: Plan, interval: BillingInterval) {
  const value = interval === "yearly" ? plan.priceYearly : plan.priceMonthly;
  if (plan.kind === "sales") return { label: plan.priceLabel, value: null, isPlaceholder: false };
  if (value == null) return { label: plan.priceLabel, value: null, isPlaceholder: true };
  return { label: formatMoney(value, plan.currency), value, isPlaceholder: false };
}

/** Yearly savings in %, computed only when both prices are real numbers. */
export function yearlySavingsPercent(plans: Plan[]): number | null {
  const pcts = plans
    .filter((p) => p.priceMonthly && p.priceYearly != null)
    .map((p) => Math.round((1 - p.priceYearly! / p.priceMonthly!) * 100))
    .filter((n) => n > 0);
  return pcts.length ? Math.max(...pcts) : null;
}
