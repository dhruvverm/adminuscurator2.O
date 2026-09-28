import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";

const navItems: { key: string; label: string; icon: IconName; count?: number }[] = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard" },
  { key: "analytics", label: "Analytics", icon: "chart" },
  { key: "automation", label: "Automation", icon: "workflow" },
  { key: "reports", label: "Reports", icon: "fileText" },
  { key: "team", label: "Team", icon: "users" },
  { key: "inbox", label: "Inbox", icon: "inbox", count: 3 },
];

/** Browser window + app sidebar chrome shared by all product mockups. */
export function MockFrame({ active, title, actions, children }: { active: string; title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="mock" role="img" aria-label={`${siteConfig.name} ${title} screen — product preview with sample data`}>
      <div className="mock__bar" aria-hidden="true">
        <div className="mock__dots">
          <i />
          <i />
          <i />
        </div>
        <div className="mock__url">
          <Icon name="lock" size={10} />
          app.{siteConfig.name.toLowerCase()}.com/{active}
        </div>
      </div>
      <div className="mock__body" aria-hidden="true">
        <aside className="mock__side">
          <div className="mock__brand">
            <LogoMark />
            {siteConfig.name}
          </div>
          <div className="mock__nav-label">Workspace</div>
          {navItems.map((n) => (
            <div key={n.key} className={`mock__nav-item${n.key === active ? " is-active" : ""}`}>
              <Icon name={n.icon} size={14} />
              {n.label}
              {n.count ? <span className="count">{n.count}</span> : null}
            </div>
          ))}
          <div className="mock__nav-label">Settings</div>
          <div className="mock__nav-item">
            <Icon name="plug" size={14} />
            Integrations
          </div>
          <div className="mock__nav-item">
            <Icon name="settings" size={14} />
            Preferences
          </div>
          <div className="mock__user">
            <span className="avatar">AJ</span>
            <div>
              <div style={{ fontWeight: 600, color: "var(--ink)" }}>Alex Jordan</div>
              <div style={{ fontSize: 10, color: "var(--text-subtle)" }}>Admin · Acme Team</div>
            </div>
          </div>
        </aside>
        <div className="mock__main">
          <div className="mock__top">
            <div className="mock__title">{title}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div className="mock__search">
                <Icon name="search" size={12} /> Search…
              </div>
              <Icon name="bell" size={15} />
              {actions ?? <span className="mock__btn">+ New</span>}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Smooth area/line chart path helpers for mock charts. */
export function linePath(values: number[], w: number, h: number, pad = 4) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => [pad + i * step, h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return { d, area: `${d} L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z` };
}
