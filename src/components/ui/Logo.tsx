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
        <path d="M9 20.5 14 11l4 7 2.5-4L24 20.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20.5" cy="14" r="1.6" fill="#fff" />
      </svg>
    </span>
  );
}

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="logo" aria-label={`${siteConfig.name} — home`}>
      <LogoMark />
      <span>{siteConfig.name}</span>
    </Link>
  );
}
