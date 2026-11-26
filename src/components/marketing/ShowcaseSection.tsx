import { AnalyticsMockup, AutomationMockup, DashboardMockup, ReportsMockup } from "@/components/mockups/Mockups";
import { Showcase } from "./Showcase";
import { SectionHead } from "./Sections";

export function ShowcaseSection() {
  return (
    <section className="section section--soft" id="product" aria-labelledby="showcase-title">
      <div className="container">
        <SectionHead
          eyebrow="Product tour"
          title={<span id="showcase-title">See Adminuscurator in Action</span>}
          lede="Your day's sales, stock, dues and reports — all on one screen."
        />
        <Showcase
          panels={{
            dashboard: <DashboardMockup />,
            analytics: <AnalyticsMockup />,
            automation: <AutomationMockup />,
            reports: <ReportsMockup />,
          }}
        />
      </div>
    </section>
  );
}
