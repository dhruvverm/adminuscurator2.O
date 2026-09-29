"use client";

import { useState, type CSSProperties } from "react";
import type { Software } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { DownloadModal } from "./DownloadModal";
import { SoftwareLogo } from "./SoftwareLogo";
import { formatDate, platformBadges } from "./platforms";

export function DownloadsGrid({ software, showPlaceholderTags }: { software: Software[]; showPlaceholderTags: boolean }) {
  const [active, setActive] = useState<Software | null>(null);

  if (!software.length) {
    return (
      <div className="panel">
        <div className="empty">
          <Icon name="download" size={32} />
          No downloads are available yet.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="downloads-grid">
        {software.map((sw, i) => {
          const badges = platformBadges(sw);
          const released = formatDate(sw.releaseDate);
          return (
            <article
              key={sw.id}
              className="card card--hover sw-card reveal"
              style={{ "--delay": `${(i % 3) * 70}ms` } as CSSProperties}
              aria-labelledby={`sw-${sw.id}`}
            >
              <div className="sw-card__head">
                <SoftwareLogo software={sw} />
                <div className="sw-card__title">
                  <h3 id={`sw-${sw.id}`} className="h3">
                    {sw.name}
                  </h3>
                  <span className="pill pill--brand">v{sw.version}</span>
                </div>
                {sw.isPlaceholder && showPlaceholderTags && <span className="placeholder-tag sw-card__tag">Sample</span>}
              </div>

              <p className="sw-card__desc">{sw.description}</p>

              <ul className="sw-card__meta" aria-label="Details">
                {sw.fileSize && (
                  <li>
                    <Icon name="package" size={14} />
                    {sw.fileSize}
                  </li>
                )}
                {released && (
                  <li>
                    <Icon name="calendar" size={14} />
                    <time dateTime={sw.releaseDate}>{released}</time>
                  </li>
                )}
              </ul>

              <ul className="sw-card__platforms" aria-label="Available for">
                {badges.map((b) => (
                  <li key={b.label} className="pill">
                    <Icon name={b.icon} size={13} />
                    {b.label}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="btn btn--primary btn--block sw-card__cta"
                onClick={() => setActive(sw)}
                disabled={!badges.length}
                aria-haspopup="dialog"
              >
                <Icon name="download" size={18} />
                {badges.length ? "Download" : "Coming soon"}
                <span className="sr-only"> {sw.name}</span>
              </button>
            </article>
          );
        })}
      </div>
      <DownloadModal software={active} onClose={() => setActive(null)} />
    </>
  );
}
