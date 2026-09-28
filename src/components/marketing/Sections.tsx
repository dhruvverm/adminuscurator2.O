import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { routes, siteConfig } from "@/config/site";
import {
  benefits,
  finalCta,
  hero,
  logoCloud,
  problems,
  security,
  stats,
  steps,
  useCases,
} from "@/content/marketing";
import { comparisonRows, type Cell } from "@/content/comparison";
import type { Faq, Feature, Plan, Testimonial } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { Counter } from "@/components/ui/Counter";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { DashboardMockup } from "@/components/mockups/Mockups";

const delay = (i: number, step = 70) => ({ "--delay": `${i * step}ms` }) as CSSProperties;

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "center",
  as: Tag = "h2",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  children?: ReactNode;
}) {
  return (
    <div className={`section-head reveal${align === "left" ? " section-head--left" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={Tag === "h1" ? "h1" : "h2"}>{title}</Tag>
      {lede && <p className="lede">{lede}</p>}
      {children}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
export function Hero() {
  const [before, after] = hero.headline.split(hero.highlight);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="badge hero-in">
            <span className="badge__dot">
              <Icon name="sparkles" size={13} />
            </span>
            {hero.badge}
          </span>
          <h1 id="hero-title" className="h1 hero-in" style={delay(1)}>
            {after !== undefined ? (
              <>
                {before}
                <span className="gradient-text">{hero.highlight}</span>
                {after}
              </>
            ) : (
              hero.headline
            )}
          </h1>
          <p className="lede hero-in" style={delay(2)}>
            {hero.subheadline}
          </p>
          <div className="btn-row hero__ctas hero-in" style={delay(3)}>
            <Link href={hero.primaryCta.href} className="btn btn--primary btn--lg" data-track="cta_click" data-track-label="hero_primary">
              {hero.primaryCta.label}
              <Icon name="arrowRight" size={18} />
            </Link>
            <Link href={hero.secondaryCta.href} className="btn btn--secondary btn--lg" data-track="cta_click" data-track-label="hero_secondary">
              {hero.secondaryCta.label}
            </Link>
          </div>
          <p className="hero__trust hero-in" style={delay(4)}>
            {hero.trust.map((t) => (
              <span key={t}>
                <Icon name="checkCircle" size={16} />
                {t}
              </span>
            ))}
          </p>
        </div>

        <div className="hero__visual hero-in" style={delay(2, 90)}>
          <DashboardMockup />
          <div className="float-card float-card--a" aria-hidden="true">
            <span className="icon-tile">
              <Icon name="zap" size={16} />
            </span>
            <div>
              <strong>Workflow completed</strong>
              <small>Invoice sync · just now</small>
            </div>
          </div>
          <div className="float-card float-card--b" aria-hidden="true">
            <span className="live-dot" />
            <div>
              <strong>3 teammates online</strong>
              <small>Collaborating now</small>
            </div>
          </div>
          <div className="float-card float-card--c" aria-hidden="true">
            <span className="icon-tile" style={{ background: "var(--success-soft)", color: "var(--success)", borderColor: "#bbf7d0" }}>
              <Icon name="trendingUp" size={16} />
            </span>
            <div>
              <strong>Weekly report ready</strong>
              <small>Sent to 4 stakeholders</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust / proof ────────────────────────────────────────── */
export function TrustSection() {
  return (
    <section className="section section--tight" aria-labelledby="trust-title">
      <div className="container">
        <h2 id="trust-title" className="h3 center reveal" style={{ fontSize: "1.25rem", marginBottom: 28 }}>
          Built to Make Your Work Simpler
        </h2>
        <ul className="stats reveal">
          {stats.map((s) => (
            <li className="stat" key={s.label}>
              <div className="stat__value">
                <Counter value={s.value} />
              </div>
              <div className="stat__label">{s.label}</div>
              <PlaceholderTag show={s.placeholder} />
            </li>
          ))}
        </ul>
        <div className="logo-cloud reveal">
          <p>
            {logoCloud.heading} <PlaceholderTag show={logoCloud.placeholder} label="Placeholder logos" />
          </p>
          <ul className="logo-cloud__row">
            {logoCloud.logos.map((name) => (
              <li key={name} className="logo-placeholder">
                <i aria-hidden="true" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Problem ──────────────────────────────────────────────── */
export function ProblemSection() {
  return (
    <section className="section section--soft" aria-labelledby="problem-title">
      <div className="container">
        <SectionHead
          eyebrow="The problem"
          title={<span id="problem-title">Stop Wasting Time on Complicated Workflows</span>}
          lede="Most teams juggle too many tools and too much manual work. Sound familiar?"
        />
        <div className="grid grid-4">
          {problems.map((p, i) => (
            <article key={p.title} className="card card--hover problem-card reveal" style={delay(i)}>
              <span className="num" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="icon-tile icon-tile--muted">
                <Icon name={p.icon} size={22} />
              </span>
              <h3 className="h3">{p.title}</h3>
              <p>{p.description}</p>
            </article>
          ))}
        </div>
        <p className="solution-banner reveal">
          <span className="icon-tile">
            <Icon name="check" size={18} strokeWidth={2.5} />
          </span>
          Our software brings everything together in one simple platform.
        </p>
      </div>
    </section>
  );
}

/* ── Features ─────────────────────────────────────────────── */
export function FeaturesSection({ features, id = "features", showLinks = true }: { features: Feature[]; id?: string; showLinks?: boolean }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHead
          eyebrow="Features"
          title={<span id={`${id}-title`}>Everything You Need in One Powerful Platform</span>}
          lede="A complete toolkit to run your work — designed to be powerful for experts and simple for everyone else."
        />
        <div className="features-grid">
          {features.map((f, i) => (
            <article key={f.id} id={showLinks ? undefined : f.id} className="card card--hover feature-card reveal" style={delay(i % 4)}>
              <span className="icon-tile">
                <Icon name={f.icon} size={22} />
              </span>
              <h3 className="h3">{f.title}</h3>
              <p>{f.description}</p>
              {showLinks && f.href && (
                <Link href={f.href} className="link" aria-label={`Learn more about ${f.title}`}>
                  Learn more <Icon name="arrowRight" size={14} />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How it works ─────────────────────────────────────────── */
export function HowItWorks() {
  return (
    <section className="section section--soft" id="how-it-works" aria-labelledby="how-title">
      <div className="container">
        <SectionHead
          eyebrow="How it works"
          title={<span id="how-title">Get Started in Minutes</span>}
          lede="No lengthy implementation projects. Three simple steps and your team is up and running."
        />
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step reveal" style={delay(i, 120)}>
              <div className="step__num">
                <Icon name={s.icon} size={26} />
                <b aria-hidden="true">{i + 1}</b>
              </div>
              <h3 className="h3">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ol>
        <div className="center mt-12 reveal">
          <Link href={routes.signup} className="btn btn--primary btn--lg" data-track="cta_click" data-track-label="how_it_works">
            Create your account <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Benefits ─────────────────────────────────────────────── */
export function BenefitsSection() {
  return (
    <section className="section" aria-labelledby="benefits-title">
      <div className="container benefits">
        <div className="benefits__intro reveal">
          <p className="eyebrow">Outcomes</p>
          <h2 id="benefits-title" className="h2">
            Designed to Help Your Business Move Forward
          </h2>
          <p className="lede">
            Features matter, but results matter more. Here&apos;s what teams can expect when their work lives in one place.
          </p>
          <div className="btn-row mt-8">
            <Link href="/solutions" className="btn btn--secondary">
              Explore solutions <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
        <ul className="benefits__list">
          {benefits.map((b, i) => (
            <li key={b.title} className="benefit reveal" style={delay(i % 2)}>
              <span className="icon-tile icon-tile--lg">
                <Icon name={b.icon} size={24} />
              </span>
              <div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Comparison table ─────────────────────────────────────── */
function CellValue({ value }: { value: Cell }) {
  if (value === true)
    return (
      <span className="yes">
        <Icon name="check" size={18} strokeWidth={2.5} />
        <span className="sr-only">Included</span>
      </span>
    );
  if (value === false)
    return (
      <span className="no">
        <Icon name="minus" size={18} />
        <span className="sr-only">Not included</span>
      </span>
    );
  return <span className="txt">{value}</span>;
}

export function ComparisonTable({ plans }: { plans: Plan[] }) {
  const cols = ["starter", "professional", "business"] as const;
  const name = (id: string) => plans.find((p) => p.id === id)?.name ?? id;
  const featured = plans.find((p) => p.highlighted)?.id;
  return (
    <section className="section section--soft" id="compare" aria-labelledby="compare-title">
      <div className="container">
        <SectionHead eyebrow="Compare plans" title={<span id="compare-title">Find the Right Fit</span>} lede="A side-by-side look at what's included in every plan.">
          <p className="mt-4">
            <PlaceholderTag label="Limits are placeholders" />
          </p>
        </SectionHead>
        <p className="table-hint" aria-hidden="true">
          Swipe to compare plans <Icon name="arrowRight" size={14} />
        </p>
        <div className="table-wrap reveal" role="region" aria-label="Plan comparison" tabIndex={0}>
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">Features</th>
                {cols.map((c) => (
                  <th scope="col" key={c} className={c === featured ? "is-featured" : undefined}>
                    {name(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  {cols.map((c) => (
                    <td key={c} className={c === featured ? "is-featured" : undefined}>
                      <CellValue value={row[c]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ── Security ─────────────────────────────────────────────── */
export function SecuritySection() {
  return (
    <section className="section section--dark" id="security" aria-labelledby="security-title">
      <div className="dark-glow" aria-hidden="true" />
      <div className="container">
        <div className="section-head reveal">
          <div className="shield-visual">
            <Icon name="shield" size={34} />
          </div>
          <p className="eyebrow">Security &amp; reliability</p>
          <h2 id="security-title" className="h2">
            Your Data. Protected.
          </h2>
          <p className="lede">
            Security is built into every layer of the platform, so you can focus on your work with confidence.
          </p>
        </div>
        <div className="security-grid">
          {security.map((s, i) => (
            <article key={s.title} className="glass-card reveal" style={delay(i % 3)}>
              <span className="icon-tile">
                <Icon name={s.icon} size={22} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ─────────────────────────────────────────── */
export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const anyPlaceholder = testimonials.some((t) => t.isPlaceholder);
  return (
    <section className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHead
          eyebrow="Testimonials"
          title={<span id="testimonials-title">What Our Customers Say</span>}
          lede={anyPlaceholder ? "Sample testimonials shown below are placeholders and will be replaced with genuine customer reviews." : undefined}
        />
        <div className="grid grid-3">
          {testimonials.map((t, i) => {
            const initials = t.name.replace(/[[\]]/g, "").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
            return (
              <figure key={t.id} className="card card--hover testimonial reveal" style={{ ...delay(i), margin: 0 }}>
                {t.isPlaceholder && <span className="placeholder-tag">Sample — not a real review</span>}
                <Icon name="quote" size={30} className="testimonial__quote-icon" />
                <blockquote className="testimonial__quote" style={{ margin: 0 }}>
                  “{t.quote}”
                </blockquote>
                <figcaption className="testimonial__person">
                  {t.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.avatar} alt="" width={44} height={44} className="avatar avatar--lg" loading="lazy" />
                  ) : (
                    <span className="avatar avatar--lg" aria-hidden="true">
                      {initials || "?"}
                    </span>
                  )}
                  <div>
                    <strong>{t.name}</strong>
                    <span>
                      {t.role}, {t.company}
                    </span>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Use cases ────────────────────────────────────────────── */
export function UseCasesSection({ soft = true }: { soft?: boolean }) {
  return (
    <section className={`section${soft ? " section--soft" : ""}`} id="solutions" aria-labelledby="usecases-title">
      <div className="container">
        <SectionHead
          eyebrow="Solutions"
          title={<span id="usecases-title">Built for Teams of Every Size</span>}
          lede="Whether you're just getting started or scaling across departments, the platform adapts to how you work."
        />
        <div className="grid grid-4">
          {useCases.map((u, i) => (
            <article key={u.title} className="card card--hover usecase reveal" style={delay(i)}>
              <span className="icon-tile">
                <Icon name={u.icon} size={22} />
              </span>
              <h3 className="h3">{u.title}</h3>
              <p>{u.description}</p>
              <ul className="check-list">
                {u.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={16} strokeWidth={2.5} />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────── */
export function FaqSection({ faqs, headingAs = "h2", soft = false }: { faqs: Faq[]; headingAs?: "h1" | "h2"; soft?: boolean }) {
  return (
    <section className={`section${soft ? " section--soft" : ""}`} id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <SectionHead
          align="left"
          as={headingAs}
          eyebrow="FAQ"
          title={<span id="faq-title">Frequently Asked Questions</span>}
          lede="Can't find what you're looking for? Our team is happy to help."
        >
          <div className="btn-row mt-6">
            <Link href="/contact" className="btn btn--secondary">
              Contact us <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </SectionHead>
        <div className="accordion reveal">
          {faqs.map((f, i) => (
            <details key={f.id} open={i === 0}>
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
  );
}

/* ── Final CTA ────────────────────────────────────────────── */
export function FinalCta() {
  return (
    <section className="section section--tight" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-panel reveal">
          <h2 id="cta-title" className="h2">
            {finalCta.headline}
          </h2>
          <p>{finalCta.text}</p>
          <div className="btn-row">
            <Link href={finalCta.primary.href} className="btn btn--white btn--lg" data-track="cta_click" data-track-label="final_cta_primary">
              {finalCta.primary.label} <Icon name="arrowRight" size={18} />
            </Link>
            <Link href={finalCta.secondary.href} className="btn btn--outline-light btn--lg" data-track="cta_click" data-track-label="final_cta_sales">
              {finalCta.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact info list ────────────────────────────────────── */
export function ContactInfo() {
  const c = siteConfig.contact;
  return (
    <ul className="contact-info">
      <li>
        <span className="icon-tile"><Icon name="mail" size={18} /></span>
        <div>
          <strong>Email</strong>
          <a href={`mailto:${c.email}`}>{c.email}</a>
        </div>
      </li>
      <li>
        <span className="icon-tile"><Icon name="phone" size={18} /></span>
        <div>
          <strong>Phone</strong>
          <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}>{c.phone}</a>
        </div>
      </li>
      <li>
        <span className="icon-tile"><Icon name="mapPin" size={18} /></span>
        <div>
          <strong>Business address</strong>
          <span>{c.address}</span>
        </div>
      </li>
      <li>
        <span className="icon-tile"><Icon name="clock" size={18} /></span>
        <div>
          <strong>Business hours</strong>
          <span>{c.hours}</span>
        </div>
      </li>
    </ul>
  );
}

/* ── Inner-page hero ──────────────────────────────────────── */
export function PageHero({ eyebrow, title, lede, children }: { eyebrow?: string; title: string; lede?: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container container--narrow">
        {eyebrow && <p className="eyebrow hero-in">{eyebrow}</p>}
        <h1 className="h1 hero-in" style={delay(1)}>
          {title}
        </h1>
        {lede && (
          <p className="lede hero-in" style={delay(2)}>
            {lede}
          </p>
        )}
        {children && (
          <div className="hero-in" style={delay(3)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
