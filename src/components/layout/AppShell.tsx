import type { ReactNode } from "react";
import { logout } from "@/app/actions/auth";
import type { SafeUser } from "@/lib/auth";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { AppNav, type AppNavItem } from "./AppNav";

/** Sidebar layout shared by the customer dashboard and the admin area. */
export function AppShell({ user, nav, children, homeHref }: { user: SafeUser; nav: { label?: string; items: AppNavItem[] }[]; children: ReactNode; homeHref: string }) {
  const initials = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="app-shell">
      <aside className="app-side">
        <Logo href={homeHref} />
        {nav.map((group, i) => (
          <AppNav key={i} label={group.label} items={group.items} />
        ))}
        <div className="app-side__user">
          <span className="avatar">{initials}</span>
          <div>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <form action={logout}>
            <button type="submit" className="icon-btn" aria-label="Log out" title="Log out">
              <Icon name="logOut" size={16} />
            </button>
          </form>
        </div>
      </aside>
      <main className="app-main" id="main">
        {children}
      </main>
    </div>
  );
}
