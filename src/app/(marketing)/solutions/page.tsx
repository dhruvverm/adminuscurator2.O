import Link from "next/link";
import { getContent } from "@/lib/content";
import { landingPages } from "@/content/landing";
import { pageMetadata } from "@/lib/seo";
import { BenefitsSection, FinalCta, HowItWorks, PageHero, TestimonialsSection, UseCasesSection } from "@/components/marketing/Sections";

export const metadata = pageMetadata({
  title: "Shop Software for Optical, Clothing, Restaurants & Services",
  description: "Pick the edition made for your shop: Optical (prescriptions), Retail (size & colour stock), POS (tables, Swiggy/Zomato inbox) or Services (appointments, monthly bills).",
  path: "/solutions",
});

export default async function SolutionsPage() {
  const { testimonials } = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="One app, built around your kind of shop."
        lede="Optical, retail, services or point-of-sale — choose the edition made for your business and start billing offline in minutes."
      />
      <UseCasesSection soft={false} />
      <section className="section section--tight" aria-labelledby="by-shop-title">
        <div className="container">
          <h2 id="by-shop-title" className="h2 center" style={{ marginBottom: 24 }}>Find the software for your shop</h2>
          <div className="grid grid-3">
            {landingPages.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="card card--hover reveal" style={{ textDecoration: "none" }}>
                <p className="eyebrow">{p.eyebrow}</p>
                <h3 className="h3">{p.metaTitle}</h3>
                <p className="sm">{p.lede}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BenefitsSection />
      <HowItWorks />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCta />
    </>
  );
}
