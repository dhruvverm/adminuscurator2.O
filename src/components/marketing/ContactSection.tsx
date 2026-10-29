import { ContactForm } from "./ContactForm";
import { ContactInfo, SectionHead } from "./Sections";

export function ContactSection({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section className="section section--soft" id="contact" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div>
          <SectionHead
            align="left"
            as={headingAs}
            eyebrow="Contact"
            title={<span id="contact-title">Get in touch</span>}
            lede="Questions about the apps, pricing or activation? Message us on WhatsApp or send us a note and we'll get back to you within one business day."
          />
          <ContactInfo />
        </div>
        <div className="card contact-card reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
