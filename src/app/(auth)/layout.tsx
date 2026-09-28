import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { DashboardMockup } from "@/components/mockups/Mockups";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth">
      <main className="auth__main" id="main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Logo />
          <Link href="/" className="btn btn--ghost btn--sm">
            <Icon name="arrowLeft" size={16} /> Back to site
          </Link>
        </div>
        <div className="auth__form-wrap">{children}</div>
      </main>
      <aside className="auth__aside" aria-hidden="true">
        <p className="eyebrow" style={{ color: "#fff", opacity: 0.8 }}>Everything in one place</p>
        <h2>Work smarter with a platform your whole team will love.</h2>
        <ul className="check-list">
          <li><Icon name="checkCircle" size={18} />Set up your workspace in minutes</li>
          <li><Icon name="checkCircle" size={18} />Automate repetitive tasks</li>
          <li><Icon name="checkCircle" size={18} />Clear insights across your business</li>
        </ul>
        <DashboardMockup />
      </aside>
    </div>
  );
}
