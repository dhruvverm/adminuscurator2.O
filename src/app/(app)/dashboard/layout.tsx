import { hasRole, requireUser } from "@/lib/auth";
import { AppShell } from "@/components/layout/AppShell";
import type { AppNavItem } from "@/components/layout/AppNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("/dashboard");
  const nav: { label?: string; items: AppNavItem[] }[] = [
    {
      label: "Workspace",
      items: [
        { href: "/dashboard", label: "Overview", icon: "dashboard", exact: true },
        { href: "/dashboard/billing", label: "Plan & billing", icon: "creditCard" },
        { href: "/dashboard/settings", label: "Account settings", icon: "settings" },
      ],
    },
    {
      label: "Help",
      items: [
        { href: "/resources/documentation", label: "Documentation", icon: "fileText" },
        { href: "/contact?subject=support", label: "Contact support", icon: "headset" },
      ],
    },
  ];
  if (hasRole(user, "editor")) nav.push({ label: "Team", items: [{ href: "/admin", label: "Admin area", icon: "shield" }] });
  return (
    <AppShell user={user} nav={nav} homeHref="/dashboard">
      {children}
    </AppShell>
  );
}
