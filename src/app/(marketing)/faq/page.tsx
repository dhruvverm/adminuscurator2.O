import { getContent } from "@/lib/content";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { FaqSection, FinalCta } from "@/components/marketing/Sections";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Answers to common questions about the platform, pricing, security, integrations and support.",
  path: "/faq",
});

export default async function FaqPage() {
  const { faqs } = await getContent();
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <div style={{ paddingTop: 24 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <FaqSection faqs={faqs} headingAs="h1" />
      <FinalCta />
    </div>
  );
}
