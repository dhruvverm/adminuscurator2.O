import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Mark geometry on a 48×48 grid (source files: public/brand/). */
export const MARK = {
  cap: "M20.5 7L27.5 7L31.5 15L16.5 15Z",
  mid: ["M14 20L21.5 20L17.5 28L10 28Z", "M34 20L26.5 20L30.5 28L38 28Z"],
  base: ["M7.5 33L15 33L11 41L3.5 41Z", "M40.5 33L33 33L37 41L44.5 41Z"],
};

/** Default logo mark. Replace by setting `siteConfig.logo.src`. */
export function LogoMark({ className = "logo__mark" }: { className?: string }) {
  if (siteConfig.logo.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={siteConfig.logo.src} alt="" className={className} width={32} height={32} />;
  }
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {/* "Curated Stack": five blocks on a 1:2 slope rising to one curated capstone */}
      <g strokeWidth="2.5" strokeLinejoin="round">
        {MARK.base.map((d) => (
          <path key={d} d={d} className="logo__base" />
        ))}
        {MARK.mid.map((d) => (
          <path key={d} d={d} className="logo__mid" />
        ))}
        <path d={MARK.cap} className="logo__cap" />
      </g>
    </svg>
  );
}

/** Brand name with the accent part (e.g. "curator") in the brand color. */
export function Wordmark() {
  const { name, logo } = siteConfig;
  if (!logo.accent || !name.endsWith(logo.accent) || name === logo.accent) return <span>{name}</span>;
  return (
    <span>
      {name.slice(0, -logo.accent.length)}
      <span className="logo__accent">{logo.accent}</span>
    </span>
  );
}

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="logo" aria-label={`${siteConfig.name} — home`}>
      <LogoMark />
      <Wordmark />
    </Link>
  );
}
