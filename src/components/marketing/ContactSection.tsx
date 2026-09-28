import { ContactForm } from "./ContactForm";
import { ContactInfo, SectionHead } from "./Sections";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

export function ContactSection({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section className="section section--soft" id="contact" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div>
          <SectionHead
            align="left"
            as={headingAs}
            eyebrow="Contact"
            title={<span id="contact-title">Let&apos;s Talk About Your Team</span>}
            lede="Questions about features, pricing or a custom setup? Send us a message and we'll get back to you within one business day."
          />
          <p className="mt-2">
            <PlaceholderTag label="Contact details are placeholders" />
          </p>
          <ContactInfo />
        </div>
        <div className="card contact-card reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
