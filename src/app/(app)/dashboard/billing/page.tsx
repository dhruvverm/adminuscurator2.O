import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { formatMoney, getPlan } from "@/lib/content";
import { read } from "@/lib/store";
import { Icon } from "@/components/ui/Icon";
import { OrderStatusPill } from "@/components/admin/StatusPill";

export const metadata = { title: "Plan & billing", robots: { index: false } };

export default async function BillingPage() {
  const user = await requireUser("/dashboard/billing");
  const plan = user.subscription ? await getPlan(user.subscription.planId) : null;
  const orders = (await read()).orders.filter((o) => o.userId === user.id).reverse();

  return (
    <>
      <div className="app-header">
        <div>
          <h1>Plan &amp; billing</h1>
          <p>Manage your subscription and view past payments.</p>
        </div>
      </div>

      <section className="panel">
        <div className="panel__head">
          <h2>Current plan</h2>
          {user.subscription && <span className="pill pill--success">Active</span>}
        </div>
        <div className="panel__body" style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="h3">{plan?.name ?? "No paid plan"}</div>
            <p className="muted">{plan ? `${plan.tagline} Billed ${user.subscription!.interval}.` : "Upgrade to unlock more features for your team."}</p>
          </div>
          <div className="btn-row">
            <Link href="/pricing" className="btn btn--primary btn--sm">{plan ? "Change plan" : "View plans"}</Link>
            {plan && <Link href="/contact?subject=support" className="btn btn--secondary btn--sm">Cancel or manage</Link>}
          </div>
        </div>
      </section>

      <section className="panel mt-6">
        <div className="panel__head"><h2>Billing history</h2></div>
        {orders.length ? (
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead><tr><th>Date</th><th>Order</th><th>Plan</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td><code>{o.id}</code></td>
                    <td>{o.planName} · {o.interval}</td>
                    <td>{o.amount != null ? formatMoney(o.amount, o.currency) : "—"}</td>
                    <td><OrderStatusPill status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty"><Icon name="creditCard" size={32} />No payments yet.</div>
        )}
      </section>
    </>
  );
}
