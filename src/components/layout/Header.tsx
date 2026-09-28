"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { mainNav, siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

/** Reads the non-sensitive "signed_in" hint cookie set alongside the session. */
function useSignedIn() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    setSignedIn(document.cookie.split("; ").some((c) => c === "signed_in=1"));
  }, []);
  return signedIn;
}

export function Header({ logo }: { logo: ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const signedIn = useSignedIn();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`site-header${scrolled || open ? " is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        {logo}

        <nav className="nav" aria-label="Main">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          {siteConfig.hasAccounts &&
            (signedIn ? (
              <Link href="/dashboard" className="btn btn--ghost btn--sm login-link">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="btn btn--ghost btn--sm login-link">
                Login
              </Link>
            ))}
          <Link
            href="/signup"
            className="btn btn--primary btn--sm"
            data-track="cta_click"
            data-track-label="header_get_started"
          >
            Get Started
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "x" : "menu"} size={20} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
          <div className="btn-row">
            {siteConfig.hasAccounts && (
              <Link href={signedIn ? "/dashboard" : "/login"} className="btn btn--secondary btn--lg">
                {signedIn ? "Dashboard" : "Login"}
              </Link>
            )}
            <Link href="/signup" className="btn btn--primary btn--lg" data-track="cta_click" data-track-label="mobile_get_started">
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
