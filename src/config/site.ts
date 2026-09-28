/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — the single place to change your brand.
 * ─────────────────────────────────────────────────────────────
 *  Anything wrapped in [brackets] or marked "PLACEHOLDER" must be
 *  replaced with your real business information before launch.
 */

/**
 * Static mode: set NEXT_PUBLIC_STATIC_EXPORT=true to build a server-less
 * version (e.g. for GitHub Pages). Accounts, checkout and admin need a
 * server, so in static mode sign-up/checkout buttons lead to the contact
 * form instead.
 */
export const isStaticSite = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export const siteConfig = {
  /** Company / product name used across the site, SEO and emails. */
  name: "YourBrand",
  /** Legal entity name, used in the footer and legal pages. */
  legalName: "[Company Legal Name]",
  tagline: "Powerful Software for Modern Businesses",
  description:
    "Discover YourBrand, powerful software designed to simplify workflows, automate tasks, and help businesses work smarter.",

  /** Public URL — set NEXT_PUBLIC_SITE_URL in the environment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),

  /**
   * Logo. Leave `src` empty to use the built-in logo mark,
   * or point it at a file in /public (e.g. "/logo.svg").
   */
  logo: { src: "", alt: "YourBrand logo" },

  /** Brand colors. These become CSS variables used by every component. */
  theme: {
    primary: "#4f46e5", // main brand color (buttons, links, highlights)
    primaryStrong: "#4338ca", // hover / pressed state
    accent: "#06b6d4", // secondary accent used sparingly in gradients & charts
    ink: "#0b1220", // headings / dark sections
  },

  /** Contact details — PLACEHOLDERS until real details are provided. */
  contact: {
    email: "hello@yourcompany.com",
    salesEmail: "sales@yourcompany.com",
    supportEmail: "support@yourcompany.com",
    phone: "+1 (000) 000-0000",
    address: "[Street Address], [City], [State/Region] [Postal Code], [Country]",
    hours: "Monday – Friday, 9:00 AM – 6:00 PM [Time Zone]",
  },

  /** Social links. Remove an entry (or leave the URL empty) to hide its icon. */
  social: [
    { name: "X", icon: "x", href: "" },
    { name: "LinkedIn", icon: "linkedin", href: "" },
    { name: "GitHub", icon: "github", href: "" },
    { name: "YouTube", icon: "youtube", href: "" },
  ] as { name: string; icon: "x" | "linkedin" | "github" | "youtube"; href: string }[],

  /** Whether the product has user accounts (shows Login in the header). */
  hasAccounts: !isStaticSite,

  /**
   * When true, placeholder values (stats, prices, sample testimonials…)
   * display a small "Placeholder" tag so nothing is mistaken for a real claim.
   * Set to false once every placeholder has been replaced.
   */
  showPlaceholderTags: true,

  seo: {
    titleTemplate: "%s — YourBrand",
    defaultTitle: "YourBrand — Powerful Software for Modern Businesses",
    twitterHandle: "", // e.g. "@yourbrand"
    locale: "en_US",
  },

  /** Analytics IDs come from the environment — never hard-code them. */
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  },

  copyrightYear: 2026,
};

export type SiteConfig = typeof siteConfig;

/** Where sign-up and purchase buttons lead (contact form on a static site). */
export const routes = {
  signup: isStaticSite ? "/contact?subject=demo" : "/signup",
  checkout: (planId: string, interval: string) =>
    isStaticSite
      ? `/contact?subject=sales&plan=${encodeURIComponent(planId)}`
      : `/checkout?plan=${encodeURIComponent(planId)}&interval=${interval}`,
};

/** Main navigation (header). */
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/** Footer columns. */
export const footerNav = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/resources/integrations" },
      { label: "Updates", href: "/resources/updates" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/resources/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Documentation", href: "/resources/documentation" },
      { label: "Blog", href: "/resources/blog" },
      { label: "Help Center", href: "/resources/help-center" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Refund Policy", href: "/legal/refund" },
    ],
  },
];
