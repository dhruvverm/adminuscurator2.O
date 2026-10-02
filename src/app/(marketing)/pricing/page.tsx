import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { FaqSection, FinalCta } from "@/components/marketing/Sections";
import { PricingSection } from "@/components/marketing/PricingSection";

export const metadata = pageMetadata({
  title: "Pricing",
  description: "Simple, one-time pricing — 1 month, 6 months or lifetime access. Every plan includes all features.",
  path: "/pricing",
});

const BILLING_FAQ_IDS = ["trial", "plans", "cancel", "custom", "support"];

export default async function PricingPage() {
  const { plans, faqs } = await getContent();
  const billingFaqs = faqs.filter((f) => BILLING_FAQ_IDS.includes(f.id));
  return (
    <div style={{ paddingTop: 24 }}>
      <PricingSection plans={plans} headingAs="h1" />
      <FaqSection faqs={billingFaqs.length ? billingFaqs : faqs} />
      <FinalCta />
    </div>
  );
}
