"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pointer-driven micro-interactions for the marketing site:
 *  - cursor spotlight on cards (.card--hover)
 *  - 3D tilt on the hero mockup (.hero__visual)
 *  - magnetic hero / CTA buttons
 * All effects are opt-out for touch devices and reduced-motion users.
 */
export function Interactions() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const cleanups: Array<() => void> = [];

    // --- Spotlight on cards ---
    document.querySelectorAll<HTMLElement>(".card--hover").forEach((el) => {
      el.classList.add("spotlight");
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      };
      el.addEventListener("pointermove", move);
      cleanups.push(() => el.removeEventListener("pointermove", move));
    });

    // --- 3D tilt on the hero visual ---
    document.querySelectorAll<HTMLElement>(".hero__visual").forEach((el) => {
      el.classList.add("tilt");
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
      };
      const leave = () => {
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });

    // --- Magnetic buttons ---
    document.querySelectorAll<HTMLElement>(".hero__ctas .btn, .cta-panel .btn").forEach((el) => {
      el.classList.add("magnetic");
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        el.style.setProperty("--tx", `${(x * 12).toFixed(1)}px`);
        el.style.setProperty("--ty", `${(y * 9).toFixed(1)}px`);
      };
      const leave = () => {
        el.style.setProperty("--tx", "0px");
        el.style.setProperty("--ty", "0px");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
