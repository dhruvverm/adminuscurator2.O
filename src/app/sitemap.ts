import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { legalPages, resourcePages } from "@/content/pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const main = ["", "/features", "/solutions", "/pricing", "/about", "/faq", "/contact", "/signup"];
  return [
    ...main.map((p) => ({ url: `${siteConfig.url}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...resourcePages.map((p) => ({ url: `${siteConfig.url}/resources/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...legalPages.map((p) => ({ url: `${siteConfig.url}/legal/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
