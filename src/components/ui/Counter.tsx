"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates the leading number in a value like "10,000+" or "99.9%".
 * Non-numeric values ("24/7", "Secure") render unchanged.
 */
export function Counter({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d[\d,]*(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  // Values like "24/7" are not quantities — don't animate them.
  const animatable = !!match && !match[2].startsWith("/");

  useEffect(() => {
    if (!animatable || !match || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = parseFloat(match[1].replace(/,/g, ""));
    const decimals = match[1].split(".")[1]?.length ?? 0;
    const suffix = match[2];
    const fmt = (n: number) =>
      n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    const el = ref.current;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(fmt(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(fmt(0));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
