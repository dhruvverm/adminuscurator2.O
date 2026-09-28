"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";

export type AppNavItem = { href: string; label: string; icon: IconName; count?: number; exact?: boolean };

export function AppNav({ label, items }: { label?: string; items: AppNavItem[] }) {
  const pathname = usePathname();
  return (
    <>
      {label && <div className="app-side__label">{label}</div>}
      {items.map((item) => {
        const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} href={item.href} className="app-nav-link" aria-current={active ? "page" : undefined}>
            <Icon name={item.icon} size={18} />
            {item.label}
            {item.count ? <span className="count">{item.count}</span> : null}
          </Link>
        );
      })}
    </>
  );
}
