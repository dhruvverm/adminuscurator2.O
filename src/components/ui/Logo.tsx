import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Default logo mark. Replace by setting `siteConfig.logo.src`. */
export function LogoMark({ className = "logo__mark" }: { className?: string }) {
  if (siteConfig.logo.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={siteConfig.logo.src} alt="" className={className} width={32} height={32} />;
  }
  return (
    <span className={`${className} logo__mark--default`} aria-hidden="true">
      <svg viewBox="0 0 32 32">
        {/* "A" whose crossbar is a single curated dot */}
        <path d="M9.5 23.5 16 8.5l6.5 15" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="18.3" r="2.1" fill="#fff" />
      </svg>
    </span>
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
