import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getPlans, planPrice } from "@/lib/content";
import { getPaymentProvider } from "@/lib/payments";
import { pageMetadata } from "@/lib/seo";
import { CheckoutForm } from "./CheckoutForm";

export const metadata = pageMetadata({ title: "Checkout", description: "Complete your purchase.", path: "/checkout", noIndex: true });

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; interval?: string; cancelled?: string }>;
}) {
  const sp = await searchParams;
  const [user, plans] = await Promise.all([getCurrentUser(), getPlans()]);
  const selfServe = plans.filter((p) => p.kind === "self-serve");
  const provider = getPaymentProvider();
  const initialPlan = selfServe.find((p) => p.id === sp.plan)?.id ?? selfServe.find((p) => p.highlighted)?.id ?? selfServe[0]?.id;
  const interval = sp.interval === "yearly" ? "yearly" : "monthly";

  if (!selfServe.length) {
    return (
      <div className="card center" style={{ maxWidth: 560, margin: "0 auto" }}>
        <h1 className="h3">No plans are available for online purchase</h1>
        <p className="muted mt-2">Please contact our sales team and we&apos;ll get you set up.</p>
        <Link href="/contact?subject=sales" className="btn btn--primary mt-6">Contact Sales</Link>
      </div>
    );
  }

  return (
    <CheckoutForm
      plans={selfServe.map((p) => ({
        id: p.id,
        name: p.name,
        tagline: p.tagline,
        currency: p.currency,
        features: p.features,
        monthly: planPrice(p, "monthly"),
        yearly: planPrice(p, "yearly"),
      }))}
      initialPlan={initialPlan!}
      initialInterval={interval}
      user={user ? { name: user.name, email: user.email } : null}
      provider={provider ? { id: provider.id, label: provider.label } : null}
      cancelled={sp.cancelled === "1"}
    />
  );
}
