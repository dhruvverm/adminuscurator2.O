import Link from "next/link";
import { routes } from "@/config/site";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { FeaturesSection, FinalCta, PageHero, SecuritySection } from "@/components/marketing/Sections";
import { ShowcaseSection } from "@/components/marketing/ShowcaseSection";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Features: Billing, Stock, Udhaar & Reports",
  description: "Fast offline billing, stock with low-stock alerts, customer udhaar (credit), expenses, WhatsApp bills, thermal printing and reports — on Android, Windows and Mac.",
  path: "/features",
});

export default async function FeaturesPage() {
  const { features } = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything your shop needs. Nothing it doesn't."
        lede="Simple, offline tools for billing, stock, customers, udhaar and reports — all on your own device, no internet or account required."
      >
        <div className="btn-row mt-8" style={{ justifyContent: "center" }}>
          <Link href={routes.signup} className="btn btn--primary btn--lg" data-track="cta_click" data-track-label="features_hero">
            Get Started <Icon name="arrowRight" size={18} />
          </Link>
          <Link href="/pricing" className="btn btn--secondary btn--lg">
            View Pricing
          </Link>
        </div>
      </PageHero>
      <ShowcaseSection />
      <FeaturesSection features={features} id="all-features" showLinks={false} />
      <SecuritySection />
      <FinalCta />
    </>
  );
}
