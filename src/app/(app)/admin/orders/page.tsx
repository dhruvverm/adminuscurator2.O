import { requireRole } from "@/lib/auth";
import { formatMoney } from "@/lib/content";
import { read } from "@/lib/store";
import { Icon } from "@/components/ui/Icon";
import { OrderStatusSelect } from "@/components/admin/RowControls";

export const metadata = { title: "Orders" };

export default async function OrdersPage() {
  await requireRole("admin");
  const { orders } = await read();
  const list = [...orders].reverse();
  return (
    <>
      <div className="app-header">
        <div>
          <h1>Orders</h1>
          <p>Payment status is updated automatically by the payment provider&apos;s webhook. Manual changes are for corrections only.</p>
        </div>
      </div>
      <section className="panel">
        {list.length ? (
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead><tr><th>Date</th><th>Customer</th><th>Plan</th><th>Amount</th><th>Billing</th><th>Provider</th><th>Status</th></tr></thead>
              <tbody>
                {list.map((o) => (
                  <tr key={o.id}>
                    <td>{new Date(o.createdAt).toLocaleString()}<div className="subtle" style={{ fontSize: "0.75rem" }}><code>{o.id}</code></div></td>
                    <td>{o.email}</td>
                    <td>{o.planName} · {o.interval}</td>
                    <td>{o.amount != null ? formatMoney(o.amount, o.currency) : "—"}</td>
                    <td>{o.billing.name}{o.billing.company && <div className="subtle">{o.billing.company}</div>}<div className="subtle">{o.billing.country}</div></td>
                    <td>{o.provider}</td>
                    <td><OrderStatusSelect orderId={o.id} status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty"><Icon name="creditCard" size={32} />No orders yet.</div>
        )}
      </section>
    </>
  );
}
