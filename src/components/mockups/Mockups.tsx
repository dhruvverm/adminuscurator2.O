/**
 * Product UI previews rendered in HTML/SVG (crisp at any size, ~0 KB of
 * images). All numbers are illustrative SAMPLE data, not business claims.
 * To use real screenshots instead, set `image` in content/marketing.ts.
 */
import { Icon } from "@/components/ui/Icon";
import { MockFrame, linePath } from "./MockFrame";

const seriesA = [32, 38, 35, 46, 44, 52, 49, 61, 58, 67, 72, 70, 81];
const seriesB = [22, 24, 28, 26, 31, 30, 35, 33, 39, 41, 40, 46, 48];

function AreaChart({ h = 150 }: { h?: number }) {
  const w = 420;
  const a = linePath(seriesA, w, h);
  const b = linePath(seriesB, w, h);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mock__chart" preserveAspectRatio="none">
      <defs>
        <linearGradient id="mockAreaGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--brand)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#eef0f6" strokeDasharray="3 4" />
      ))}
      <path d={a.area} fill="url(#mockAreaGrad)" />
      <path d={b.d} fill="none" stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.8" className="chart-line" />
      <path d={a.d} fill="none" stroke="var(--brand)" strokeWidth="2.5" className="chart-line" />
    </svg>
  );
}

function Bars({ values, h = 120 }: { values: number[]; h?: number }) {
  const w = 300;
  const bw = w / values.length;
  const max = Math.max(...values);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mock__chart" preserveAspectRatio="none">
      {values.map((v, i) => {
        const bh = (v / max) * (h - 8);
        return (
          <rect
            key={i}
            className="chart-bar"
            style={{ animationDelay: `${i * 50}ms` }}
            x={i * bw + bw * 0.2}
            y={h - bh}
            width={bw * 0.6}
            height={bh}
            rx="3"
            fill={i === values.length - 2 ? "var(--brand)" : "color-mix(in srgb, var(--brand) 22%, #fff)"}
          />
        );
      })}
    </svg>
  );
}

function Donut() {
  const segs = [
    { v: 46, c: "var(--brand)" },
    { v: 28, c: "var(--accent)" },
    { v: 16, c: "color-mix(in srgb, var(--brand) 35%, #fff)" },
    { v: 10, c: "#e6e8f0" },
  ];
  const r = 34;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 90 90" width="96" height="96">
      {segs.map((s, i) => {
        const len = (s.v / 100) * circ;
        const el = (
          <circle
            key={i}
            cx="45"
            cy="45"
            r={r}
            fill="none"
            stroke={s.c}
            strokeWidth="12"
            strokeDasharray={`${len} ${circ - len}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 45 45)"
          />
        );
        offset += len;
        return el;
      })}
      <text x="45" y="49" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">
        46%
      </text>
    </svg>
  );
}

function Kpis({ items }: { items: { label: string; value: string; delta: string; down?: boolean }[] }) {
  return (
    <div className="mock__kpis">
      {items.map((k) => (
        <div className="mock__kpi" key={k.label}>
          <div className="mock__kpi-label">{k.label}</div>
          <div className="mock__kpi-value">{k.value}</div>
          <div className={`mock__delta${k.down ? " is-down" : ""}`}>{k.delta}</div>
        </div>
      ))}
    </div>
  );
}

export function DashboardMockup() {
  return (
    <MockFrame active="dashboard" title="Good morning, Alex 👋">
      <Kpis
        items={[
          { label: "Active projects", value: "24", delta: "↑ 12% vs last week" },
          { label: "Tasks completed", value: "1,284", delta: "↑ 8.2%" },
          { label: "Hours saved", value: "326h", delta: "↑ 21%" },
          { label: "Open issues", value: "7", delta: "↓ 3 this week", down: false },
        ]}
      />
      <div className="mock__row">
        <div className="mock__panel">
          <div className="mock__panel-head">
            <span>Performance overview</span>
            <span>Last 90 days</span>
          </div>
          <AreaChart />
          <div className="mock__legend">
            <span><i style={{ background: "var(--brand)" }} />Completed</span>
            <span><i style={{ background: "var(--accent)" }} />Automated</span>
          </div>
        </div>
        <div className="mock__panel">
          <div className="mock__panel-head">
            <span>Activity</span>
            <span className="live-dot" />
          </div>
          <ul className="mock__activity">
            <li><span className="avatar">SK</span><div>Sam approved <b>Q3 plan</b><small>2 min ago</small></div></li>
            <li><span className="avatar" style={{ background: "var(--accent)" }}>⚡</span><div>Workflow <b>Invoice sync</b> ran<small>14 min ago</small></div></li>
            <li><span className="avatar">RM</span><div>Riya commented on <b>Launch</b><small>1 hr ago</small></div></li>
            <li><span className="avatar">JD</span><div>Jordan created a report<small>3 hr ago</small></div></li>
          </ul>
        </div>
      </div>
      <div className="mock__panel">
        <div className="mock__panel-head">
          <span>Recent tasks</span>
          <span>View all</span>
        </div>
        <table className="mock__table">
          <thead>
            <tr><th>Task</th><th>Owner</th><th>Progress</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>Onboard new client</td><td>Sam K.</td><td style={{ width: "30%" }}><div className="mock__bar-track"><div className="mock__bar-fill" style={{ width: "82%" }} /></div></td><td><span className="mock__status mock__status--run">In progress</span></td></tr>
            <tr><td>Monthly report</td><td>Riya M.</td><td><div className="mock__bar-track"><div className="mock__bar-fill" style={{ width: "100%" }} /></div></td><td><span className="mock__status mock__status--ok">Done</span></td></tr>
            <tr><td>Update pricing sheet</td><td>Jordan D.</td><td><div className="mock__bar-track"><div className="mock__bar-fill" style={{ width: "35%" }} /></div></td><td><span className="mock__status mock__status--wait">Review</span></td></tr>
          </tbody>
        </table>
      </div>
    </MockFrame>
  );
}

export function AnalyticsMockup() {
  return (
    <MockFrame active="analytics" title="Analytics" actions={<span className="mock__btn">Export</span>}>
      <Kpis
        items={[
          { label: "Conversion rate", value: "4.8%", delta: "↑ 0.6 pts" },
          { label: "Avg. cycle time", value: "2.4d", delta: "↓ 18%" },
          { label: "Throughput", value: "312", delta: "↑ 9%" },
          { label: "Goal progress", value: "76%", delta: "On track" },
        ]}
      />
      <div className="mock__panel">
        <div className="mock__panel-head">
          <span>Trend comparison</span>
          <span>This quarter vs last</span>
        </div>
        <AreaChart h={170} />
      </div>
      <div className="mock__row">
        <div className="mock__panel">
          <div className="mock__panel-head"><span>Weekly volume</span><span>12 weeks</span></div>
          <Bars values={[18, 24, 21, 30, 28, 34, 31, 38, 36, 42, 47, 44]} />
        </div>
        <div className="mock__panel" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Donut />
          <div className="mock__legend" style={{ flexDirection: "column", gap: 6 }}>
            <span><i style={{ background: "var(--brand)" }} />Direct</span>
            <span><i style={{ background: "var(--accent)" }} />Referral</span>
            <span><i style={{ background: "color-mix(in srgb, var(--brand) 35%, #fff)" }} />Partner</span>
            <span><i style={{ background: "#e6e8f0" }} />Other</span>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function FlowNode({ icon, title, sub, tone = "brand" }: { icon: Parameters<typeof Icon>[0]["name"]; title: string; sub: string; tone?: "brand" | "accent" | "ok" }) {
  const bg = tone === "accent" ? "color-mix(in srgb, var(--accent) 14%, #fff)" : tone === "ok" ? "var(--success-soft)" : "var(--brand-soft)";
  const fg = tone === "accent" ? "color-mix(in srgb, var(--accent) 70%, #000)" : tone === "ok" ? "var(--success)" : "var(--brand)";
  return (
    <div className="mock__panel" style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", boxShadow: "var(--shadow-xs)" }}>
      <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 8, background: bg, color: fg }}>
        <Icon name={icon} size={15} />
      </span>
      <div>
        <div style={{ fontWeight: 650, color: "var(--ink)" }}>{title}</div>
        <div style={{ fontSize: 10.5, color: "var(--text-subtle)" }}>{sub}</div>
      </div>
    </div>
  );
}

function Connector() {
  return <div style={{ width: 2, height: 16, margin: "0 auto", background: "repeating-linear-gradient(var(--brand-border) 0 4px, transparent 4px 7px)" }} />;
}

export function AutomationMockup() {
  return (
    <MockFrame active="automation" title="Workflow: New client onboarding" actions={<span className="mock__btn">Publish</span>}>
      <div className="mock__row" style={{ gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr)" }}>
        <div className="mock__panel" style={{ background: "#fafbfd", backgroundImage: "radial-gradient(#e3e6ef 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
          <div style={{ maxWidth: 260, margin: "6px auto" }}>
            <FlowNode icon="zap" title="Trigger: Form submitted" sub="When a new client signs up" tone="accent" />
            <Connector />
            <FlowNode icon="filter" title="Condition: Plan is Pro" sub="Otherwise → standard path" />
            <Connector />
            <FlowNode icon="users" title="Assign account owner" sub="Round-robin · Sales team" />
            <Connector />
            <FlowNode icon="mail" title="Send welcome email" sub="Template: Welcome v2" />
            <Connector />
            <FlowNode icon="checkCircle" title="Create onboarding tasks" sub="5 tasks · due in 7 days" tone="ok" />
          </div>
        </div>
        <div className="mock__panel">
          <div className="mock__panel-head"><span>Run history</span><span>Today</span></div>
          <table className="mock__table">
            <tbody>
              {[
                ["09:42", "Completed", "ok"],
                ["09:15", "Completed", "ok"],
                ["08:57", "Running", "run"],
                ["08:30", "Completed", "ok"],
                ["08:02", "Waiting", "wait"],
                ["07:48", "Completed", "ok"],
              ].map(([t, s, k]) => (
                <tr key={t}>
                  <td>{t}</td>
                  <td>Run #{t.replace(":", "")}</td>
                  <td><span className={`mock__status mock__status--${k}`}>{s}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 10, padding: 10, borderRadius: 8, background: "var(--brand-softer)", color: "var(--brand-strong)", fontWeight: 600 }}>
            ⚡ 128 runs this week
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

export function ReportsMockup() {
  const reports = [
    ["Monthly performance", "PDF", "Scheduled · 1st of month", "ok"],
    ["Team productivity", "CSV", "Weekly · Mondays", "ok"],
    ["Quarterly review", "PDF", "Draft", "wait"],
    ["Pipeline summary", "Link", "Shared with 4 people", "run"],
  ];
  return (
    <MockFrame active="reports" title="Reports" actions={<span className="mock__btn">+ New report</span>}>
      <div className="mock__row" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}>
        <div className="mock__panel">
          <div className="mock__panel-head"><span>Monthly performance</span><span>Preview</span></div>
          <div style={{ display: "grid", gap: 8 }}>
            {[["Revenue goal", 78], ["Tasks on time", 92], ["Automation coverage", 64], ["Customer satisfaction", 88]].map(([l, v]) => (
              <div key={l as string}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                  <span>{l}</span>
                  <b>{v}%</b>
                </div>
                <div className="mock__bar-track"><div className="mock__bar-fill" style={{ width: `${v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mock__panel">
          <div className="mock__panel-head"><span>Summary</span><span>Auto-generated</span></div>
          <Bars values={[12, 18, 15, 22, 26, 24, 31]} h={96} />
          <p style={{ marginTop: 8, fontSize: 11, color: "var(--text-muted)" }}>
            Output grew steadily this month, led by the automation workflows introduced in week 2.
          </p>
        </div>
      </div>
      <div className="mock__panel">
        <table className="mock__table">
          <thead><tr><th>Report</th><th>Format</th><th>Delivery</th><th /></tr></thead>
          <tbody>
            {reports.map(([n, f, d, k]) => (
              <tr key={n}>
                <td style={{ fontWeight: 600 }}><Icon name="fileText" size={12} style={{ display: "inline", marginRight: 6, verticalAlign: -2 }} />{n}</td>
                <td>{f}</td>
                <td style={{ color: "var(--text-muted)" }}>{d}</td>
                <td><span className={`mock__status mock__status--${k}`}>{k === "ok" ? "Active" : k === "wait" ? "Draft" : "Shared"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockFrame>
  );
}
