import Link from "next/link";
import { siteConfig } from "@/config/site";
import { landingBySlug, type LandingPage } from "@/content/landing";
import { breadcrumbLd, faqLd, jsonLd, pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/ui/Icon";
import { FinalCta, PageHero, SectionHead } from "@/components/marketing/Sections";

/** Title/description/canonical for a landing page. */
export function landingMetadata(slug: string) {
  const p = landingBySlug(slug)!;
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/${p.slug}` });
}

/** A search-focused page for one kind of shop: what the edition does, who it is for, FAQs. */
export function LandingPageView({ slug }: { slug: string }) {
  const p = landingBySlug(slug) as LandingPage;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.edition,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android, Windows, macOS",
    description: p.metaDescription,
    url: `${siteConfig.url}/${p.slug}/`,
    downloadUrl: `${siteConfig.url}/downloads/`,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    offers: [
      { "@type": "Offer", name: "1 Month", price: 1500, priceCurrency: "INR" },
      { "@type": "Offer", name: "6 Months", price: 8000, priceCurrency: "INR" },
      { "@type": "Offer", name: "Lifetime", price: 25000, priceCurrency: "INR" },
    ],
  };
  const related = p.related.map((s) => landingBySlug(s)).filter(Boolean) as LandingPage[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(appLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd(p.faqs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: p.eyebrow, path: `/${p.slug}` }]))} />

      <PageHero eyebrow={p.eyebrow} title={p.h1} lede={p.lede}>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/downloads" className="btn btn--primary btn--lg" data-track="cta_click" data-track-label={`landing_${p.slug}_download`}>
            Download free trial <Icon name="arrowRight" size={18} />
          </Link>
          <Link href="/contact" className="btn btn--secondary btn--lg">
            Ask for a demo
          </Link>
        </div>
      </PageHero>

      <section className="section section--tight">
        <div className="container container--narrow prose">
          <nav aria-label="Breadcrumb" className="sm" style={{ marginBottom: 18, opacity: 0.75 }}>
            <Link href="/">Home</Link> › <Link href="/solutions">Solutions</Link> › <span>{p.eyebrow}</span>
          </nav>
          {p.intro.map((t) => (
            <p key={t.slice(0, 24)}>{t}</p>
          ))}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead eyebrow={p.edition} title={p.featuresTitle} />
          <div className="grid grid-3">
            {p.features.map((f) => (
              <article key={f.title} className="card card--hover reveal">
                <span className="icon-tile">
                  <Icon name="check" size={20} strokeWidth={2.5} />
                </span>
                <h3 className="h3">{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: "start", gap: 32 }}>
          <div className="card reveal">
            <h2 className="h3">{p.whoTitle}</h2>
            <ul className="check-list">
              {p.who.map((w) => (
                <li key={w}>
                  <Icon name="check" size={16} strokeWidth={2.5} />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="card reveal">
            <h2 className="h3">{p.whyTitle}</h2>
            <ul className="check-list">
              {p.why.map((w) => (
                <li key={w}>
                  <Icon name="check" size={16} strokeWidth={2.5} />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="lp-faq-title">
        <div className="container faq-layout">
          <SectionHead align="left" eyebrow="FAQ" title={<span id="lp-faq-title">Questions shop owners ask</span>}>
            <div className="btn-row mt-6">
              <Link href="/faq" className="btn btn--secondary">
                All FAQs <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </SectionHead>
          <div className="accordion reveal">
            {p.faqs.map((f, i) => (
              <details key={f.question} open={i === 0}>
                <summary>
                  {f.question}
                  <span className="chev" aria-hidden="true">
                    <Icon name="plus" size={16} />
                  </span>
                </summary>
                <div className="answer">
                  <p>{f.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <SectionHead title="Software for other kinds of shops" />
            <div className="grid grid-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/${r.slug}`} className="card card--hover reveal" style={{ textDecoration: "none" }}>
                  <p className="eyebrow">{r.eyebrow}</p>
                  <h3 className="h3">{r.metaTitle}</h3>
                  <span className="sm" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Learn more <Icon name="arrowRight" size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
