"use client";

import { useEffect, useState } from "react";

/** Cycles through words with a vertical flip, for a lively hero sub-line. */
export function RotatingWords({ words, interval = 1900 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="rotator" aria-live="polite">
      {/* widest word reserves the box so layout never jumps */}
      <span className="rotator__sizer" aria-hidden="true">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      {words.map((w, n) => (
        <span key={w} className={`rotator__word${n === i ? " is-active" : ""}`} aria-hidden={n === i ? undefined : true}>
          {w}
        </span>
      ))}
    </span>
  );
}
