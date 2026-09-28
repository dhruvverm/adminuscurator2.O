"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { CONSENT_KEY, track, type AnalyticsEvent } from "@/lib/analytics";

const OPEN_EVENT = "open-cookie-settings";
const { gaMeasurementId: GA, gtmId: GTM, metaPixelId: PIXEL } = siteConfig.analytics;
const hasProviders = Boolean(GA || GTM || PIXEL);

function readConsent(): "accepted" | "declined" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Cookie banner + analytics loader. Third-party analytics scripts are only
 * injected after the visitor explicitly accepts. If no analytics IDs are
 * configured, no banner is shown at all (only essential cookies are used).
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    setShowBanner(hasProviders && c === null);
    const open = () => setShowBanner(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  // Global CTA tracking: any element with data-track="event" is tracked on click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track as AnalyticsEvent, {
        label: el.dataset.trackLabel,
        plan: el.dataset.trackPlan,
        path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    setShowBanner(false);
    if (value === "declined" && consent === "accepted") {
      window.location.reload(); // unload already-injected scripts
      return;
    }
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" && <AnalyticsScripts />}
      {showBanner && (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie preferences">
          <strong>We value your privacy</strong>
          <p>
            We use essential cookies to run this site. With your permission we&apos;d also like to use analytics
            cookies to understand how it&apos;s used. <Link href="/legal/cookies">Cookie Policy</Link>
          </p>
          <div className="btn-row">
            <button className="btn btn--secondary btn--sm" onClick={() => choose("declined")}>
              Decline
            </button>
            <button className="btn btn--primary btn--sm" onClick={() => choose("accepted")}>
              Accept analytics
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  if (!hasProviders) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}

function AnalyticsScripts() {
  return (
    <>
      {GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA)}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA)});`}
          </Script>
        </>
      )}
      {GTM && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM)});`}
        </Script>
      )}
      {PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(PIXEL)});fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
