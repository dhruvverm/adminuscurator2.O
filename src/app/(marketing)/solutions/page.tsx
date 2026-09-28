import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { BenefitsSection, FinalCta, HowItWorks, PageHero, TestimonialsSection, UseCasesSection } from "@/components/marketing/Sections";

export const metadata = pageMetadata({
  title: "Solutions",
  description: "See how startups, small businesses, growing teams and enterprises use the platform to simplify their work.",
  path: "/solutions",
});

export default async function SolutionsPage() {
  const { testimonials } = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="One Platform. Built Around the Way You Work."
        lede="From first hire to enterprise scale, give every team the tools to move faster with less busywork."
      />
      <UseCasesSection soft={false} />
      <BenefitsSection />
      <HowItWorks />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCta />
    </>
  );
}
