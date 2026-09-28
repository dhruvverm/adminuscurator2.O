import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ComparisonTable, FaqSection, FinalCta } from "@/components/marketing/Sections";
import { PricingSection } from "@/components/marketing/PricingSection";

export const metadata = pageMetadata({
  title: "Pricing",
  description: "Simple, transparent pricing for teams of every size. Compare the Starter, Professional and Business plans.",
  path: "/pricing",
});

const BILLING_FAQ_IDS = ["trial", "plans", "cancel", "custom", "support"];

export default async function PricingPage() {
  const { plans, faqs } = await getContent();
  const billingFaqs = faqs.filter((f) => BILLING_FAQ_IDS.includes(f.id));
  return (
    <div style={{ paddingTop: 24 }}>
      <PricingSection plans={plans} headingAs="h1" showCompareLink={false} />
      <ComparisonTable plans={plans} />
      <FaqSection faqs={billingFaqs.length ? billingFaqs : faqs} />
      <FinalCta />
    </div>
  );
}
