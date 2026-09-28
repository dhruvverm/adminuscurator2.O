import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-soft)" }}>
      <header className="site-header is-scrolled" style={{ position: "relative" }}>
        <div className="container site-header__inner">
          <Logo />
          <span className="pill">
            <Icon name="lock" size={13} /> Secure checkout
          </span>
        </div>
      </header>
      <main id="main" className="container" style={{ paddingBlock: "clamp(28px, 5vw, 56px) 80px" }}>
        {children}
      </main>
    </div>
  );
}
