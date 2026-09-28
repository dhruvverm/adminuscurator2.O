"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
import { startCheckout } from "@/app/actions/checkout";
import { FormAlert, SelectField, SubmitButton, TextField, useFormValidation } from "@/components/forms/Field";
import { Icon } from "@/components/ui/Icon";
import type { BillingInterval } from "@/content/types";
import { track } from "@/lib/analytics";
import { checkRequired, collect, type FormState } from "@/lib/validation";
import { COUNTRIES } from "./countries";

type Price = { label: string; value: number | null; isPlaceholder: boolean };
type PlanOption = { id: string; name: string; tagline: string; currency: string; features: string[]; monthly: Price; yearly: Price };

const STEPS = ["Select plan", "Account", "Billing", "Payment", "Confirmation", "Access"];

const validate = (d: FormData) =>
  collect({
    billingName: checkRequired(String(d.get("billingName") ?? "").trim(), "Billing name", 2),
    country: d.get("country") ? null : "Please select your country.",
  });

export function CheckoutForm({
  plans,
  initialPlan,
  initialInterval,
  user,
  provider,
  cancelled,
}: {
  plans: PlanOption[];
  initialPlan: string;
  initialInterval: BillingInterval;
  user: { name: string; email: string } | null;
  provider: { id: string; label: string } | null;
  cancelled: boolean;
}) {
  const [planId, setPlanId] = useState(initialPlan);
  const [interval, setBilling] = useState<BillingInterval>(initialInterval);
  const [state, action, pending] = useActionState<FormState, FormData>(startCheckout, { ok: false });
  const { errors, formProps } = useFormValidation(validate);
  const all = { ...state.errors, ...errors };
  const v = state.values ?? {};

  const plan = useMemo(() => plans.find((p) => p.id === planId) ?? plans[0], [plans, planId]);
  const price = interval === "yearly" ? plan.yearly : plan.monthly;
  const nextUrl = `/checkout?plan=${plan.id}&interval=${interval}`;
  const currentStep = user ? 2 : 1;

  useEffect(() => {
    track("begin_checkout", { plan: initialPlan, interval: initialInterval });
  }, [initialPlan, initialInterval]);

  return (
    <>
      <ol className="checkout-steps" aria-label="Checkout progress">
        {STEPS.map((s, i) => (
          <li key={s} className={i < currentStep ? "is-done" : i === currentStep ? "is-current" : undefined} aria-current={i === currentStep ? "step" : undefined}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <h1 className="h2" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", marginBottom: 24 }}>
        Complete your purchase
      </h1>

      {cancelled && (
        <div className="alert alert--info" role="status" style={{ marginBottom: 20 }}>
          <Icon name="helpCircle" size={18} />
          <span>Payment was cancelled — you haven&apos;t been charged. You can try again whenever you&apos;re ready.</span>
        </div>
      )}

      <form action={action} className="checkout" {...formProps}>
        <div>
          {/* 1. Plan */}
          <section className="card checkout-block" aria-labelledby="co-plan">
            <div className="checkout-block__head">
              <h2 id="co-plan"><span className="step-dot is-done">1</span>Select your plan</h2>
              <div className="billing-toggle" role="group" aria-label="Billing period">
                <button type="button" aria-pressed={interval === "monthly"} onClick={() => setBilling("monthly")}>Monthly</button>
                <button type="button" aria-pressed={interval === "yearly"} onClick={() => setBilling("yearly")}>Yearly</button>
              </div>
            </div>
            <input type="hidden" name="interval" value={interval} />
            <div className="plan-options" role="radiogroup" aria-labelledby="co-plan">
              {plans.map((p) => {
                const pr = interval === "yearly" ? p.yearly : p.monthly;
                return (
                  <label key={p.id} className="plan-option">
                    <input
                      type="radio"
                      name="plan"
                      value={p.id}
                      checked={p.id === planId}
                      onChange={() => {
                        setPlanId(p.id);
                        track("select_plan", { plan: p.id, interval });
                      }}
                    />
                    <span>
                      <span className="plan-option__name">{p.name}</span>
                      <span className="plan-option__desc" style={{ display: "block" }}>{p.tagline}</span>
                    </span>
                    <span className="plan-option__price">
                      {pr.label}
                      <span className="subtle" style={{ fontWeight: 500, fontSize: "0.8125rem" }}> /mo</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 2. Account */}
          <section className="card checkout-block" aria-labelledby="co-account">
            <div className="checkout-block__head">
              <h2 id="co-account"><span className={`step-dot${user ? " is-done" : ""}`}>2</span>Your account</h2>
            </div>
            {user ? (
              <div className="alert alert--success">
                <Icon name="checkCircle" size={18} />
                <span>
                  Signed in as <strong>{user.name}</strong> ({user.email}).
                </span>
              </div>
            ) : (
              <>
                <p className="muted">Create an account or log in to continue. Your plan selection will be saved.</p>
                <div className="btn-row mt-4">
                  <Link href={`/signup?next=${encodeURIComponent(nextUrl)}`} className="btn btn--primary">Create account</Link>
                  <Link href={`/login?next=${encodeURIComponent(nextUrl)}`} className="btn btn--secondary">Log in</Link>
                </div>
              </>
            )}
          </section>

          {/* 3. Billing */}
          <fieldset className="card checkout-block" disabled={!user} style={{ opacity: user ? 1 : 0.55, margin: "20px 0 0", minWidth: 0 }} aria-labelledby="co-billing">
            <div className="checkout-block__head">
              <h2 id="co-billing"><span className="step-dot">3</span>Billing details</h2>
            </div>
            <div className="form">
              <div className="form-row">
                <TextField name="billingName" label="Full name on invoice" autoComplete="name" defaultValue={v.billingName ?? user?.name} error={all.billingName} />
                <TextField name="billingCompany" label="Company" optional autoComplete="organization" defaultValue={v.billingCompany} />
              </div>
              <div className="form-row">
                <SelectField
                  name="country"
                  label="Country"
                  autoComplete="country-name"
                  options={[{ value: "", label: "Select country…" }, ...COUNTRIES.map((c) => ({ value: c, label: c }))]}
                  defaultValue={v.country ?? ""}
                  error={all.country}
                />
                <TextField name="taxId" label="VAT / Tax ID" optional defaultValue={v.taxId} />
              </div>
              <p className="field-hint">
                Card details are entered on our payment provider&apos;s secure page — we never see or store your card number.
              </p>
            </div>
          </fieldset>
        </div>

        {/* Summary + pay */}
        <aside className="card order-summary" aria-labelledby="co-summary">
          <h2 id="co-summary" className="h3">Order summary</h2>
          <div className="mt-4">
            <div className="summary-line">
              <span>Plan</span>
              <strong>{plan.name}</strong>
            </div>
            <div className="summary-line">
              <span>Billing</span>
              <strong>{interval === "yearly" ? "Yearly" : "Monthly"}</strong>
            </div>
            <div className="summary-line">
              <span>Price</span>
              <strong>
                {price.label} / month
              </strong>
            </div>
            {interval === "yearly" && price.value != null && (
              <div className="summary-line">
                <span>Billed today</span>
                <strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: plan.currency }).format(price.value * 12)}</strong>
              </div>
            )}
            <div className="summary-line summary-total">
              <span>Total</span>
              <strong>{price.isPlaceholder ? "Calculated at payment" : `${price.label}${interval === "yearly" ? " /mo, billed yearly" : " /mo"}`}</strong>
            </div>
            <p className="field-hint">Taxes, if applicable, are calculated at payment.</p>
          </div>

          <ul className="check-list" style={{ fontSize: "0.875rem" }}>
            {plan.features.slice(0, 4).map((f) => (
              <li key={f}>
                <Icon name="check" size={16} strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6" style={{ display: "grid", gap: 12 }}>
            <FormAlert ok={state.ok} message={state.message} />
            {provider?.id === "demo" && (
              <div className="alert alert--warning" role="note">
                <Icon name="helpCircle" size={18} />
                <span>Demo mode: no payment provider is configured, so no payment will be taken.</span>
              </div>
            )}
            {!provider && (
              <div className="alert alert--info" role="note">
                <Icon name="helpCircle" size={18} />
                <span>
                  Online payments aren&apos;t enabled yet. <Link href="/contact?subject=sales" className="link">Contact sales</Link> to get started.
                </span>
              </div>
            )}
            <SubmitButton pending={pending} disabled={!user || !provider} className="btn btn--primary btn--lg btn--block">
              <Icon name="lock" size={16} /> Continue to secure payment
            </SubmitButton>
          </div>
          <p className="secure-note">
            <Icon name="shield" size={14} /> {provider?.label ?? "Secure payment"} · Cancel anytime
          </p>
          <p className="field-hint center mt-2">
            By continuing you agree to our <Link href="/legal/terms" className="link">Terms</Link> and{" "}
            <Link href="/legal/refund" className="link">Refund Policy</Link>.
          </p>
        </aside>
      </form>
    </>
  );
}
