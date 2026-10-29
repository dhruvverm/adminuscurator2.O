import Link from "next/link";
import { siteConfig } from "@/config/site";
import { about } from "@/content/marketing";
import { pageMetadata } from "@/lib/seo";
import { FinalCta, PageHero, SectionHead, TrustSection } from "@/components/marketing/Sections";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "About",
  description: `Learn about ${siteConfig.name}, our mission, and the values behind the software we build.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title={about.headline} lede={about.intro} />

      <section className="section section--tight">
        <div className="container container--narrow">
          <div className="card reveal" style={{ padding: "clamp(28px, 5vw, 48px)", textAlign: "center" }}>
            <p className="eyebrow">Our mission</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.375rem, 2.6vw, 1.875rem)", fontWeight: 650, color: "var(--ink)", lineHeight: 1.35, letterSpacing: "-0.02em" }}>
              {about.mission}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead eyebrow="What we believe" title="Our Values" />
          <div className="grid grid-4">
            {about.values.map((v) => (
              <article key={v.title} className="card card--hover reveal">
                <span className="icon-tile">
                  <Icon name={v.icon} size={22} />
                </span>
                <h3 className="h3">{v.title}</h3>
                <p>{v.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      <section className="section section--tight">
        <div className="container center reveal">
          <h2 className="h2">Have a question?</h2>
          <p className="lede">We&apos;d love to hear from shopkeepers and partners — reach us any time on WhatsApp.</p>
          <div className="btn-row mt-8" style={{ justifyContent: "center" }}>
            <Link href="/contact" className="btn btn--primary btn--lg">Contact us</Link>
            <Link href="/downloads" className="btn btn--secondary btn--lg">Download free</Link>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
