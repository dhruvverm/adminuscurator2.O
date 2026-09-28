"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { showcase, type ShowcaseKey } from "@/content/marketing";
import { Icon } from "@/components/ui/Icon";

/**
 * Tabbed product showcase (WAI-ARIA tabs pattern with arrow-key support).
 * Mockups are passed in from the server so they aren't shipped as client JS.
 */
export function Showcase({ panels }: { panels: Record<ShowcaseKey, ReactNode> }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = showcase[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const last = showcase.length - 1;
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div className="tabs reveal" role="tablist" aria-label="Product areas" onKeyDown={onKeyDown}>
        {showcase.map((s, i) => (
          <button
            key={s.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`tab-${s.key}`}
            aria-selected={i === active}
            aria-controls={`panel-${s.key}`}
            tabIndex={i === active ? 0 : -1}
            className="tab"
            onClick={() => setActive(i)}
          >
            <Icon name={s.icon} size={16} />
            {s.tab}
          </button>
        ))}
      </div>

      <div
        className="showcase"
        role="tabpanel"
        id={`panel-${item.key}`}
        aria-labelledby={`tab-${item.key}`}
        key={item.key}
      >
        <div className="showcase__copy showcase__panel">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <ul className="check-list">
            {item.points.map((p) => (
              <li key={p}>
                <Icon name="checkCircle" size={18} />
                {p}
              </li>
            ))}
          </ul>
          <div className="btn-row mt-8">
            <Link href="/#how-it-works" className="btn btn--primary" data-track="cta_click" data-track-label={`showcase_${item.key}`}>
              See How It Works <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
        <div className="showcase__panel">
          {item.image ? (
            <Image
              src={item.image}
              alt={`${item.tab} screen`}
              width={1400}
              height={900}
              sizes="(min-width: 1000px) 720px, 100vw"
              className="mock"
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            panels[item.key]
          )}
          <p className="subtle center mt-4" style={{ fontSize: "0.8125rem" }}>
            Product preview with sample data.
          </p>
        </div>
      </div>
    </>
  );
}
