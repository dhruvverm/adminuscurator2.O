"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/site";
import type { BillingInterval, Plan } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: amount % 1 ? 2 : 0 }).format(amount);
}

function priceFor(plan: Plan, interval: BillingInterval) {
  if (plan.kind === "sales") return { label: plan.priceLabel, placeholder: false, numeric: false };
  const v = interval === "yearly" ? plan.priceYearly : plan.priceMonthly;
  return v == null
    ? { label: plan.priceLabel, placeholder: true, numeric: true }
    : { label: fmt(v, plan.currency), placeholder: false, numeric: true };
}

export function PricingCards({
  plans,
  savingsPercent,
  showPlaceholderTags,
}: {
  plans: Plan[];
  savingsPercent: number | null;
  showPlaceholderTags: boolean;
}) {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const savingsText = savingsPercent ? `Save up to ${savingsPercent}% with yearly billing` : "Save XX% with yearly billing";

  return (
    <>
      <div className="center reveal">
        <div className="billing-toggle" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={interval === "monthly"} onClick={() => setInterval("monthly")}>
            Monthly
          </button>
          <button type="button" aria-pressed={interval === "yearly"} onClick={() => setInterval("yearly")}>
            Yearly
          </button>
        </div>
        <p className="savings-note" aria-live="polite">
          <Icon name="tag" size={16} />
          {savingsText}
          {!savingsPercent && showPlaceholderTags && <span className="placeholder-tag">Placeholder</span>}
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => {
          const price = priceFor(plan, interval);
          const href =
            plan.kind === "sales"
              ? `/contact?subject=sales&plan=${encodeURIComponent(plan.id)}`
              : routes.checkout(plan.id, interval);
          return (
            <article
              key={plan.id}
              className={`card card--hover plan reveal${plan.highlighted ? " plan--featured" : ""}`}
              aria-labelledby={`plan-${plan.id}`}
            >
              {plan.badge && <span className="plan__badge">{plan.badge}</span>}
              <h3 id={`plan-${plan.id}`} className="h3" style={{ fontSize: "1.25rem" }}>
                {plan.name}
              </h3>
              <p className="plan__tagline">{plan.tagline}</p>
              <div className="plan__price">
                <span className="plan__amount">{price.label}</span>
                {price.numeric && <span className="plan__period">/ month</span>}
                {price.placeholder && showPlaceholderTags && <span className="placeholder-tag">Placeholder price</span>}
              </div>
              <p className="plan__billed">
                {price.numeric ? (interval === "yearly" ? "Billed annually" : "Billed monthly") : "Custom pricing for your organization"}
              </p>
              <Link
                href={href}
                className={`btn btn--lg btn--block ${plan.highlighted ? "btn--white" : plan.kind === "sales" ? "btn--secondary" : "btn--primary"}`}
                data-track="select_plan"
                data-track-plan={plan.id}
                data-track-label={`${plan.id}_${interval}`}
              >
                {plan.cta}
              </Link>
              <ul className="plan__features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={18} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </>
  );
}
