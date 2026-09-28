import { hasRole, requireRole } from "@/lib/auth";
import { read } from "@/lib/store";
import { AppShell } from "@/components/layout/AppShell";
import type { AppNavItem } from "@/components/layout/AppNav";

export const metadata = { title: { default: "Admin", template: "%s · Admin" }, robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("editor");
  const { messages } = await read();
  const unread = messages.filter((m) => m.status === "new").length;
  const isAdmin = hasRole(user, "admin");

  const nav: { label?: string; items: AppNavItem[] }[] = [
    {
      label: "Admin",
      items: [
        { href: "/admin", label: "Overview", icon: "dashboard", exact: true },
        { href: "/admin/messages", label: "Messages", icon: "inbox", count: unread },
        ...(isAdmin
          ? ([
              { href: "/admin/orders", label: "Orders", icon: "creditCard" },
              { href: "/admin/customers", label: "Customers", icon: "users" },
            ] as AppNavItem[])
          : []),
      ],
    },
    {
      label: "Content",
      items: [
        { href: "/admin/content/products", label: "Products", icon: "package" },
        { href: "/admin/content/plans", label: "Pricing", icon: "tag" },
        { href: "/admin/content/features", label: "Features", icon: "sparkles" },
        { href: "/admin/content/testimonials", label: "Testimonials", icon: "quote" },
        { href: "/admin/content/faqs", label: "FAQs", icon: "helpCircle" },
      ],
    },
    { label: "Site", items: [{ href: "/", label: "View website", icon: "globe", exact: true }, { href: "/dashboard", label: "My dashboard", icon: "home", exact: true }] },
  ];

  return (
    <AppShell user={user} nav={nav} homeHref="/admin">
      {children}
    </AppShell>
  );
}
