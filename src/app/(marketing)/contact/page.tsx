import { pageMetadata } from "@/lib/seo";
import { ContactSection } from "@/components/marketing/ContactSection";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with our team about sales, demos, support or custom solutions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 24 }}>
      <ContactSection headingAs="h1" />
    </div>
  );
}
