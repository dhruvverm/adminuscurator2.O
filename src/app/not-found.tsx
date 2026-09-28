import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <>
      <Header logo={<Logo />} />
      <main id="main" className="page-hero" style={{ minHeight: "60vh" }}>
        <div className="hero__bg" aria-hidden="true" />
        <div className="container container--narrow">
          <p className="eyebrow">Error 404</p>
          <h1 className="h1">Page not found</h1>
          <p className="lede">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <div className="btn-row mt-8" style={{ justifyContent: "center" }}>
            <Link href="/" className="btn btn--primary btn--lg"><Icon name="home" size={18} /> Back to home</Link>
            <Link href="/contact" className="btn btn--secondary btn--lg">Contact us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
