import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/content";
import { jsonLd, pageMetadata } from "@/lib/seo";
import {
  BenefitsSection,
  FaqSection,
  FeaturesSection,
  FinalCta,
  Hero,
  HowItWorks,
  ProblemSection,
  SecuritySection,
  TestimonialsSection,
  TrustSection,
  UseCasesSection,
} from "@/components/marketing/Sections";
import { PricingSection } from "@/components/marketing/PricingSection";
import { ContactSection } from "@/components/marketing/ContactSection";
import { ShowcaseSection } from "@/components/marketing/ShowcaseSection";

// SEO — edit the homepage title/description here.
export const metadata = pageMetadata({
  title: `${siteConfig.name} — Powerful Software for Modern Businesses`,
  description: `Discover ${siteConfig.name}, powerful software designed to simplify workflows, automate tasks, and help businesses work smarter.`,
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  const { features, plans, testimonials, faqs } = await getContent();

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: siteConfig.url,
    // Only emit offers with real prices (never placeholders).
    ...(plans.some((p) => p.priceMonthly != null)
      ? {
          offers: plans
            .filter((p) => p.priceMonthly != null)
            .map((p) => ({ "@type": "Offer", name: p.name, price: p.priceMonthly, priceCurrency: p.currency })),
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(softwareLd)} />
      <Hero />
      <TrustSection />
      <ProblemSection />
      <FeaturesSection features={features} />
      <ShowcaseSection />
      <HowItWorks />
      <BenefitsSection />
      <PricingSection plans={plans} />
      <SecuritySection />
      <TestimonialsSection testimonials={testimonials} />
      <UseCasesSection />
      <FaqSection faqs={faqs.slice(0, 6)} />
      <FinalCta />
      <ContactSection />
    </>
  );
}
