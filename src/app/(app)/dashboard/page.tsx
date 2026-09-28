import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getPlan } from "@/lib/content";
import { read } from "@/lib/store";
import { Icon } from "@/components/ui/Icon";
import { DashboardMockup } from "@/components/mockups/Mockups";

export const metadata = { title: "Dashboard", robots: { index: false } };

export default async function DashboardPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const user = await requireUser();
  const plan = user.subscription ? await getPlan(user.subscription.planId) : null;
  const { orders } = await read();
  const paidOrders = orders.filter((o) => o.userId === user.id && o.status === "paid").length;

  const checklist = [
    { done: true, label: "Create your account" },
    { done: !!user.subscription, label: "Choose a plan", href: "/pricing" },
    { done: false, label: "Configure your workspace", href: "/resources/documentation" },
    { done: false, label: "Invite your team", href: "/resources/documentation" },
  ];

  return (
    <>
      {sp.welcome && (
        <div className="alert alert--success" role="status" style={{ marginBottom: 20 }}>
          <Icon name="sparkles" size={18} />
          <span>Welcome aboard, {user.name.split(" ")[0]}! Your account is ready.</span>
        </div>
      )}
      {sp.reset && (
        <div className="alert alert--success" role="status" style={{ marginBottom: 20 }}>
          <Icon name="checkCircle" size={18} />
          <span>Your password has been updated.</span>
        </div>
      )}
      {sp.denied && (
        <div className="alert alert--error" role="alert" style={{ marginBottom: 20 }}>
          <Icon name="lock" size={18} />
          <span>You don&apos;t have permission to access that area.</span>
        </div>
      )}

      <div className="app-header">
        <div>
          <h1>Hi {user.name.split(" ")[0]} 👋</h1>
          <p>Here&apos;s an overview of your workspace.</p>
        </div>
        {!user.subscription && (
          <Link href="/pricing" className="btn btn--primary">
            Choose a plan <Icon name="arrowRight" size={16} />
          </Link>
        )}
      </div>

      <div className="kpi-grid">
        <div className="card kpi">
          <div className="kpi__label"><Icon name="package" size={16} />Current plan</div>
          <div className="kpi__value">{plan?.name ?? "Free"}</div>
          <span className={`pill ${user.subscription ? "pill--success" : ""}`}>{user.subscription ? `Active · ${user.subscription.interval}` : "No paid plan"}</span>
        </div>
        <div className="card kpi">
          <div className="kpi__label"><Icon name="calendar" size={16} />Member since</div>
          <div className="kpi__value">{new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
        </div>
        <div className="card kpi">
          <div className="kpi__label"><Icon name="creditCard" size={16} />Payments</div>
          <div className="kpi__value">{paidOrders}</div>
          <Link href="/dashboard/billing" className="link" style={{ fontSize: "0.875rem" }}>View billing</Link>
        </div>
      </div>

      <div className="grid mt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
        <section className="panel">
          <div className="panel__head"><h2>Getting started</h2><span className="pill pill--brand">{checklist.filter((c) => c.done).length}/{checklist.length}</span></div>
          <ul className="panel__body" style={{ display: "grid", gap: 12 }}>
            {checklist.map((c) => (
              <li key={c.label} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ color: c.done ? "var(--success)" : "var(--border-strong)" }}>
                  <Icon name="checkCircle" size={22} />
                </span>
                {c.href && !c.done ? <Link href={c.href} className="link">{c.label}</Link> : <span style={{ textDecoration: c.done ? "line-through" : undefined, color: c.done ? "var(--text-subtle)" : undefined }}>{c.label}</span>}
              </li>
            ))}
          </ul>
        </section>
        <section className="panel">
          <div className="panel__head"><h2>Need help?</h2></div>
          <div className="panel__body">
            <p className="muted">Our team can help you configure the platform around your workflow.</p>
            <div className="btn-row mt-4">
              <Link href="/resources/documentation" className="btn btn--secondary btn--sm">Read the docs</Link>
              <Link href="/contact?subject=support" className="btn btn--secondary btn--sm">Contact support</Link>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-8">
        <div className="app-header" style={{ marginBottom: 16 }}>
          <div>
            <h2 className="h3">Your workspace</h2>
            <p>[Connect your application here — this preview stands in for the product UI.]</p>
          </div>
        </div>
        <DashboardMockup />
      </section>
    </>
  );
}
