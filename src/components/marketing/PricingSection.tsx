import { siteConfig } from "@/config/site";
import type { Plan } from "@/content/types";
import { PricingCards } from "./Pricing";
import { SectionHead } from "./Sections";

export function PricingSection({ plans, headingAs = "h2" }: { plans: Plan[]; headingAs?: "h1" | "h2" }) {
  return (
    <section className="section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHead
          as={headingAs}
          eyebrow="Pricing"
          title={<span id="pricing-title">Simple, One-Time Pricing</span>}
          lede="Every plan unlocks the complete software — choose how long you want access for. No subscriptions, no auto-renewal."
        />
        <PricingCards plans={plans} showPlaceholderTags={siteConfig.showPlaceholderTags} />
        <p className="pricing-footnote">Prices are in Indian Rupees and exclude applicable taxes.</p>
      </div>
    </section>
  );
}
