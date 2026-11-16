import Link from "next/link";
import { footerNav, siteConfig } from "@/config/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { CookieSettingsButton } from "./CookieConsent";

const socialIcon: Record<string, IconName> = {
  x: "x_social",
  linkedin: "linkedin",
  github: "github",
  youtube: "youtube",
};

export function Footer() {
  const socials = siteConfig.social.filter((s) => s.href);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Powerful, easy-to-use software that helps modern teams streamline workflows, automate routine work and
              make better decisions.
            </p>
          </div>
          {footerNav.map((col) => (
            <nav key={col.title} className="footer-col" aria-labelledby={`footer-${col.title}`}>
              <h2 id={`footer-${col.title}`}>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
                {col.title === "Legal" && (
                  <li>
                    <CookieSettingsButton />
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        <ul className="footer-trust" aria-label="About this business">
          <li className="trust-badge">
            <svg className="trust-flag" viewBox="0 0 30 20" width="30" height="20" aria-hidden="true">
              <rect width="30" height="20" rx="2.5" fill="#fff" />
              <path d="M0 2.5A2.5 2.5 0 0 1 2.5 0h25A2.5 2.5 0 0 1 30 2.5v4.17H0Z" fill="#FF9933" />
              <path d="M0 13.33h30v4.17a2.5 2.5 0 0 1-2.5 2.5h-25A2.5 2.5 0 0 1 0 17.5Z" fill="#138808" />
              <circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" strokeWidth="0.7" />
              <circle cx="15" cy="10" r="0.5" fill="#000080" />
            </svg>
            <span className="trust-title">Built in India</span>
          </li>
          {siteConfig.udyamNumber && (
            <li className="trust-badge">
              <span className="trust-icon">
                <Icon name="shield" size={20} />
              </span>
              <span>
                <span className="trust-title">Registered MSME</span>
                <span className="trust-sub">{siteConfig.udyamNumber}</span>
              </span>
            </li>
          )}
        </ul>

        <div className="footer-bottom">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          {socials.length > 0 && (
            <ul className="socials" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                    <Icon name={socialIcon[s.icon]} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
