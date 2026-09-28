import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { formatMoney } from "@/lib/content";
import { getPaymentProvider } from "@/lib/payments";
import { pageMetadata } from "@/lib/seo";
import { findOrder, markOrderPaid } from "@/lib/store";
import { Icon } from "@/components/ui/Icon";
import { PurchaseTracker } from "./PurchaseTracker";

export const metadata = pageMetadata({ title: "Purchase complete", description: "Your purchase is complete.", path: "/checkout/success", noIndex: true });

export default async function SuccessPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const user = await requireUser(`/checkout/success?order=${params.order ?? ""}`);
  let order = params.order ? await findOrder(params.order) : null;
  if (!order || order.userId !== user.id) order = null;

  // Confirm with the provider on return (webhooks also confirm independently).
  if (order && order.status === "pending") {
    const provider = getPaymentProvider();
    if (provider && provider.id === order.provider) {
      try {
        if (await provider.confirm(order, params)) order = (await markOrderPaid(order.id)) ?? order;
      } catch (err) {
        console.error("[checkout] confirm failed", err);
      }
    }
  }

  if (!order) {
    return (
      <div className="card center" style={{ maxWidth: 560, margin: "0 auto" }}>
        <h1 className="h3">We couldn&apos;t find that order</h1>
        <p className="muted mt-2">If you completed a payment, it may take a moment to appear in your dashboard.</p>
        <Link href="/dashboard" className="btn btn--primary mt-6">Go to dashboard</Link>
      </div>
    );
  }

  const paid = order.status === "paid";
  return (
    <div className="card" style={{ maxWidth: 780, margin: "0 auto", padding: "clamp(24px, 5vw, 48px)", textAlign: "center" }}>
      <ol className="checkout-steps" aria-label="Checkout progress" style={{ textAlign: "left" }}>
        {["Select plan", "Account", "Billing", "Payment", "Confirmation", "Access"].map((s, i) => (
          <li key={s} className={i < (paid ? 5 : 3) ? "is-done" : i === (paid ? 5 : 3) ? "is-current" : undefined}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>
      {paid ? (
        <>
          <PurchaseTracker orderId={order.id} plan={order.planId} value={order.amount} currency={order.currency} />
          <div className="success-mark">
            <Icon name="check" size={38} strokeWidth={2.5} />
          </div>
          <h1 className="h2" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>You&apos;re all set!</h1>
          <p className="lede" style={{ marginTop: 12 }}>
            Your <strong>{order.planName}</strong> plan is now active for {order.email}.
          </p>
          {params.demo && (
            <div className="alert alert--warning mt-6" style={{ textAlign: "left" }}>
              <Icon name="helpCircle" size={18} />
              <span>Demo mode — no real payment was taken.</span>
            </div>
          )}
          <div className="panel mt-8" style={{ textAlign: "left" }}>
            <div className="panel__body">
              <div className="summary-line"><span>Order</span><strong>{order.id}</strong></div>
              <div className="summary-line"><span>Plan</span><strong>{order.planName} ({order.interval})</strong></div>
              <div className="summary-line">
                <span>Amount</span>
                <strong>{order.amount != null ? `${formatMoney(order.amount, order.currency)} / month` : "Price not set yet"}</strong>
              </div>
            </div>
          </div>
          <div className="btn-row mt-8" style={{ justifyContent: "center" }}>
            <Link href="/dashboard" className="btn btn--primary btn--lg">
              Open your workspace <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="success-mark" style={{ background: "var(--warning-soft)", color: "var(--warning)" }}>
            <Icon name="clock" size={36} />
          </div>
          <h1 className="h3">Payment processing</h1>
          <p className="muted mt-2">
            We&apos;re waiting for confirmation from our payment provider. This usually takes a few seconds — refresh this page or check your dashboard shortly.
          </p>
          <div className="btn-row mt-8" style={{ justifyContent: "center" }}>
            <Link href={`/checkout/success?order=${order.id}`} className="btn btn--secondary">Refresh</Link>
            <Link href="/dashboard" className="btn btn--primary">Go to dashboard</Link>
          </div>
        </>
      )}
    </div>
  );
}
