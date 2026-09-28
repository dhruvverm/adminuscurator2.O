import Link from "next/link";
import { hasRole, requireRole } from "@/lib/auth";
import { formatMoney } from "@/lib/content";
import { read } from "@/lib/store";
import { Icon } from "@/components/ui/Icon";
import { OrderStatusPill } from "@/components/admin/StatusPill";

export const metadata = { title: "Overview" };

export default async function AdminOverview() {
  const user = await requireRole("editor");
  const isAdmin = hasRole(user, "admin");
  const { users, orders, messages } = await read();
  const paid = orders.filter((o) => o.status === "paid");
  const revenue = paid.reduce((sum, o) => sum + (o.amount ?? 0) * (o.interval === "yearly" ? 12 : 1), 0);
  const kpis = [
    { label: "Customers", value: users.filter((u) => u.role === "customer").length, icon: "users" as const, admin: true },
    { label: "Active subscriptions", value: users.filter((u) => u.subscription?.status === "active").length, icon: "package" as const, admin: true },
    { label: "Paid orders", value: paid.length, icon: "creditCard" as const, admin: true },
    { label: "Recorded revenue", value: formatMoney(revenue, paid[0]?.currency ?? "USD"), icon: "trendingUp" as const, admin: true },
    { label: "New messages", value: messages.filter((m) => m.status === "new").length, icon: "inbox" as const, admin: false },
  ].filter((k) => isAdmin || !k.admin);

  return (
    <>
      <div className="app-header">
        <div>
          <h1>Admin overview</h1>
          <p>Signed in as {user.email} · role: {user.role}</p>
        </div>
        <Link href="/" className="btn btn--secondary btn--sm">
          <Icon name="globe" size={16} /> View website
        </Link>
      </div>

      <div className="kpi-grid">
        {kpis.map((k) => (
          <div className="card kpi" key={k.label}>
            <div className="kpi__label"><Icon name={k.icon} size={16} />{k.label}</div>
            <div className="kpi__value">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid mt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", alignItems: "start" }}>
        {isAdmin && (
          <section className="panel">
            <div className="panel__head"><h2>Recent orders</h2><Link href="/admin/orders" className="link" style={{ fontSize: "0.875rem" }}>View all</Link></div>
            {orders.length ? (
              <div style={{ overflowX: "auto" }}>
                <table className="table">
                  <tbody>
                    {orders.slice(-5).reverse().map((o) => (
                      <tr key={o.id}>
                        <td><strong>{o.email}</strong><div className="subtle" style={{ fontSize: "0.8125rem" }}>{o.planName} · {o.interval}</div></td>
                        <td style={{ textAlign: "right" }}><OrderStatusPill status={o.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty"><Icon name="creditCard" size={28} />No orders yet.</div>
            )}
          </section>
        )}
        <section className="panel">
          <div className="panel__head"><h2>Latest messages</h2><Link href="/admin/messages" className="link" style={{ fontSize: "0.875rem" }}>View all</Link></div>
          {messages.length ? (
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <tbody>
                  {messages.slice(-5).reverse().map((m) => (
                    <tr key={m.id}>
                      <td><strong>{m.subject}</strong><div className="subtle" style={{ fontSize: "0.8125rem" }}>{m.name} · {m.email}</div></td>
                      <td style={{ textAlign: "right" }}><OrderStatusPill status={m.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty"><Icon name="inbox" size={28} />No messages yet.</div>
          )}
        </section>
      </div>
    </>
  );
}
