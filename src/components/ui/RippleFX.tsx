"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Droplet tap ripple (Apple "Liquid Glass" feel): on press, a soft circular
 * ripple expands from the pointer inside any button. One delegated listener,
 * so it covers buttons added later. Disabled for reduced-motion users.
 */
export function RippleFX() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(".btn");
      if (!target) return;
      const r = target.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 1.25;
      const span = document.createElement("span");
      span.className = "ripple";
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${e.clientX - r.left}px`;
      span.style.top = `${e.clientY - r.top}px`;
      target.appendChild(span);
      const remove = () => span.remove();
      span.addEventListener("animationend", remove);
      window.setTimeout(remove, 800);
    };

    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [pathname]);

  return null;
}
