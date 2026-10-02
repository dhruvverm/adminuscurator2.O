"use client";

import Link from "next/link";
import { routes } from "@/config/site";
import type { Plan } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

function fmt(amount: number, currency: string) {
  const locale = currency === "INR" ? "en-IN" : "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: amount % 1 ? 2 : 0 }).format(amount);
}

function priceFor(plan: Plan) {
  if (plan.kind === "sales") return { label: plan.priceLabel, placeholder: false, numeric: false };
  return plan.priceMonthly == null
    ? { label: plan.priceLabel, placeholder: true, numeric: true }
    : { label: fmt(plan.priceMonthly, plan.currency), placeholder: false, numeric: true };
}

export function PricingCards({
  plans,
  showPlaceholderTags,
}: {
  plans: Plan[];
  showPlaceholderTags: boolean;
}) {
  return (
    <>
      <p className="savings-note center reveal" aria-live="polite">
        <Icon name="check" size={16} />
        Every plan includes all features — pay once, no auto-renewal.
      </p>

      <div className="pricing-grid">
        {plans.map((plan) => {
          const price = priceFor(plan);
          const href =
            plan.kind === "sales"
              ? `/contact?subject=sales&plan=${encodeURIComponent(plan.id)}`
              : routes.checkout(plan.id, "monthly");
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
                {price.numeric && plan.period && <span className="plan__period">{plan.period}</span>}
                {price.placeholder && showPlaceholderTags && <span className="placeholder-tag">Placeholder price</span>}
              </div>
              <p className="plan__billed">
                {price.numeric ? "One-time payment" : "Custom pricing for your organization"}
              </p>
              <Link
                href={href}
                className={`btn btn--lg btn--block ${plan.highlighted ? "btn--white" : plan.kind === "sales" ? "btn--secondary" : "btn--primary"}`}
                data-track="select_plan"
                data-track-plan={plan.id}
                data-track-label={plan.id}
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
