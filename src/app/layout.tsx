import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { jsonLd } from "@/lib/seo";
import { RevealObserver } from "@/components/ui/RevealObserver";
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
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  email: siteConfig.contact.email,
  sameAs: siteConfig.social.filter((s) => s.href).map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} style={themeVars} suppressHydrationWarning>
      <head>
        {/* Enables reveal-on-scroll only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organization)} />
      </head>
      <body>
        {children}
        <RevealObserver />
        <CookieConsent />
      </body>
    </html>
  );
}
