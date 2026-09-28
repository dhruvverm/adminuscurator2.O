"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main" className="page-hero" style={{ minHeight: "70vh", marginTop: 0 }}>
      <div className="hero__bg" aria-hidden="true" />
      <div className="container container--narrow">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="h2">We hit an unexpected error</h1>
        <p className="lede">Please try again. If the problem continues, contact our support team.</p>
        <div className="btn-row mt-8" style={{ justifyContent: "center" }}>
          <button className="btn btn--primary btn--lg" onClick={reset}>Try again</button>
          <Link href="/" className="btn btn--secondary btn--lg">Go home</Link>
        </div>
      </div>
    </main>
  );
}
