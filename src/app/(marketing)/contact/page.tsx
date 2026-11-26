import { pageMetadata } from "@/lib/seo";
import { ContactSection } from "@/components/marketing/ContactSection";

export const metadata = pageMetadata({
  title: "Contact Us – Demo, Support & Sales",
  description: "Talk to Adminuscurator on WhatsApp or email for a free demo, help choosing an edition, support or a trial code. We reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 24 }}>
      <ContactSection headingAs="h1" />
    </div>
  );
}
