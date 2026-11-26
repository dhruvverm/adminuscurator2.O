import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { FaqSection, FinalCta } from "@/components/marketing/Sections";
import { PricingSection } from "@/components/marketing/PricingSection";

export const metadata = pageMetadata({
  title: "Pricing: 1 Month, 6 Months or Lifetime",
  description: "Simple pricing for Adminuscurator: ₹1,500 for 1 month, ₹8,000 for 6 months or ₹25,000 lifetime. Every plan has all features. Free trial, no account needed.",
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
