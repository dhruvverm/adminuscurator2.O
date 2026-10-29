"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-driven effects:
 *  - parallax on any [data-parallax] element (value = speed, e.g. 0.15 / -0.1)
 *  - a back-to-top button that appears after scrolling
 * Parallax is skipped for reduced-motion users; the button still works (instant scroll).
 */
export function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Back-to-top button (created once, reused across navigations)
    let btt = document.getElementById("back-to-top") as HTMLButtonElement | null;
    if (!btt) {
      btt = document.createElement("button");
      btt.id = "back-to-top";
      btt.type = "button";
      btt.setAttribute("aria-label", "Back to top");
      btt.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
      btt.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }),
      );
      document.body.appendChild(btt);
    }
    const button = btt;

    const parallax = reduce
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    let ticking = false;
    const update = () => {
      ticking = false;
      button.classList.toggle("show", window.scrollY > 600);
      const vh = window.innerHeight;
      for (const el of parallax) {
        const speed = parseFloat(el.dataset.parallax || "0.1");
        const r = el.getBoundingClientRect();
        const offset = r.top + r.height / 2 - vh / 2;
        el.style.setProperty("--py", `${(offset * -speed).toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
