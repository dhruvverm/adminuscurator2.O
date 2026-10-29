import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { BenefitsSection, FinalCta, HowItWorks, PageHero, TestimonialsSection, UseCasesSection } from "@/components/marketing/Sections";

export const metadata = pageMetadata({
  title: "Solutions",
  description: "See how optical shops, clothing and retail stores, service businesses and busy counters use Adminuscurator to run their day.",
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
      <BenefitsSection />
      <HowItWorks />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCta />
    </>
  );
}
