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
