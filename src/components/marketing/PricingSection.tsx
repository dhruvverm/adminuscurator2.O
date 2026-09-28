import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Plan } from "@/content/types";
import { yearlySavingsPercent } from "@/lib/content";
import { PricingCards } from "./Pricing";
import { SectionHead } from "./Sections";

export function PricingSection({ plans, headingAs = "h2", showCompareLink = true }: { plans: Plan[]; headingAs?: "h1" | "h2"; showCompareLink?: boolean }) {
  return (
    <section className="section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHead
          as={headingAs}
          eyebrow="Pricing"
          title={<span id="pricing-title">Simple, Transparent Pricing</span>}
          lede="Choose the plan that fits your team today. Upgrade, downgrade or cancel as your needs change."
        />
        <PricingCards plans={plans} savingsPercent={yearlySavingsPercent(plans)} showPlaceholderTags={siteConfig.showPlaceholderTags} />
        <p className="pricing-footnote">
          Prices shown exclude applicable taxes. Payments are processed securely by our payment provider.
          {showCompareLink && (
            <>
              {" "}
              <Link href="/pricing#compare" className="link">
                Compare all features
              </Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
