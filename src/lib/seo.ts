import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Per-page SEO metadata: title, description, canonical URL,
 * Open Graph and Twitter/X card. Edit each page's values where it
 * calls this helper.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  // The site is exported with trailing slashes, so the canonical address ends in "/" too.
  const url = `${siteConfig.url}${path === "/" ? "/" : path.replace(/\/?$/, "/")}`;
  const fullTitle = absoluteTitle ? title : `${title} — ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.seo.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: siteConfig.seo.twitterHandle || undefined,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

/** BreadcrumbList for an inner page: Home › … › this page. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.url}${it.path === "/" ? "/" : it.path.replace(/\/?$/, "/")}`,
    })),
  };
}

/** FAQPage structured data from question/answer pairs. */
export function faqLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

/** Serializes JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
