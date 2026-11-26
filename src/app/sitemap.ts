import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { legalPages, resourcePages } from "@/content/pages";
import { landingPages } from "@/content/landing";

export const dynamic = "force-static";

/* Every address ends in "/" because the site is exported with trailing slashes —
   listing the slash-less form would make Google follow a redirect for every page. */
const u = (p: string) => `${siteConfig.url}${p}/`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const main = ["/features", "/solutions", "/pricing", "/downloads", "/about", "/faq", "/contact"];
  return [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    ...landingPages.map((p) => ({ url: u(`/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...main.map((p) => ({ url: u(p), lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...resourcePages.filter((p) => !p.noIndex).map((p) => ({ url: u(`/resources/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...legalPages.map((p) => ({ url: u(`/legal/${p.slug}`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
