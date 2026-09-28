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
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
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

/** Serializes JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
