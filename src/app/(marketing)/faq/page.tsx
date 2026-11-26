import { getContent } from "@/lib/content";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { FaqSection, FinalCta } from "@/components/marketing/Sections";

export const metadata = pageMetadata({
  title: "FAQ – Offline Billing & Inventory Software",
  description: "Answers about Adminuscurator: offline use, editions, devices, backup and data safety, printers, WhatsApp bills, pricing and the free trial.",
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
