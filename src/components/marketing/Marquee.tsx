const ITEMS = [
  "Offline billing",
  "Stock & low-stock alerts",
  "Udhaar / credit tracking",
  "WhatsApp invoices",
  "Thermal & A5 printing",
  "Daily profit reports",
  "Backup & restore",
  "Android · Windows · Mac",
  "No account needed",
  "Your data stays on-device",
];

/** Edge-to-edge infinite scrolling ticker of product capabilities. */
export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span className="marquee__item" key={i}>
            <span className="marquee__dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
