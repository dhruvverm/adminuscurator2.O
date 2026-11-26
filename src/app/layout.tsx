import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { jsonLd } from "@/lib/seo";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Interactions } from "@/components/ui/Interactions";
import { ScrollFX } from "@/components/ui/ScrollFX";
import { RippleFX } from "@/components/ui/RippleFX";
import { CookieConsent } from "@/components/layout/CookieConsent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.seo.defaultTitle, template: siteConfig.seo.titleTemplate },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "offline billing software", "billing software for shop", "inventory software India", "optical shop software",
    "clothing store billing software", "restaurant POS software", "udhaar khata app", "billing app for Android",
  ],
  verification: {
    google: siteConfig.seo.googleVerification || undefined,
    other: siteConfig.seo.bingVerification ? { "msvalidate.01": siteConfig.seo.bingVerification } : undefined,
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    locale: siteConfig.seo.locale,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    site: siteConfig.seo.twitterHandle || undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const themeVars = {
  "--brand": siteConfig.theme.primary,
  "--brand-strong": siteConfig.theme.primaryStrong,
  "--accent": siteConfig.theme.accent,
  "--ink": siteConfig.theme.ink,
} as CSSProperties;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
  logo: `${siteConfig.url}/icon.svg`,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: { "@type": "PostalAddress", addressRegion: "Delhi", addressCountry: "IN" },
  areaServed: { "@type": "Country", name: "India" },
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", telephone: siteConfig.contact.phone, email: siteConfig.contact.supportEmail, areaServed: "IN", availableLanguage: ["English", "Hindi"] }],
  sameAs: siteConfig.social.filter((s) => s.href).map((s) => s.href),
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
  inLanguage: "en-IN",
  publisher: { "@id": `${siteConfig.url}/#organization` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable}`} style={themeVars} suppressHydrationWarning>
      <head>
        {/* Enables reveal-on-scroll only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organization)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(website)} />
      </head>
      <body>
        {children}
        <RevealObserver />
        <Interactions />
        <ScrollFX />
        <RippleFX />
        <CookieConsent />
      </body>
    </html>
  );
}
