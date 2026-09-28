import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { BrandMark } from "./brand-mark";

export const dynamic = "force-static";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share image (Open Graph + Twitter/X). */
export default function OpengraphImage() {
  const { primary, ink } = siteConfig.theme;
  const accent = "#2a8fdc";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: ink,
          backgroundImage: `radial-gradient(circle at 90% 10%, ${primary}cc, transparent 55%), radial-gradient(circle at 0% 100%, ${accent}88, transparent 50%)`,
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700 }}>
          <BrandMark size={64} primary={primary} accent={accent} />
          <div style={{ display: "flex" }}>
            {siteConfig.logo.accent && siteConfig.name.endsWith(siteConfig.logo.accent) ? (
              <>
                <span>{siteConfig.name.slice(0, -siteConfig.logo.accent.length)}</span>
                <span style={{ color: "#a5b4fc" }}>{siteConfig.logo.accent}</span>
              </>
            ) : (
              siteConfig.name
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            Everything You Need to Work Smarter, Faster, and Better.
          </div>
          <div style={{ fontSize: 30, color: "#c7cfe0" }}>{siteConfig.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
