/** Festive Diwali greeting bar shown above the site header. */
function Diya() {
  return (
    <svg className="diya" viewBox="0 0 48 34" width="30" height="21" aria-hidden="true">
      <defs>
        <linearGradient id="diwali-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3b0" />
          <stop offset="0.5" stopColor="#ffcf4d" />
          <stop offset="1" stopColor="#ff8a1e" />
        </linearGradient>
        <linearGradient id="diwali-bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d36b" />
          <stop offset="1" stopColor="#b8771f" />
        </linearGradient>
      </defs>
      {/* flame */}
      <path className="diya__flame" d="M24 2c0 4 4 6 4 10 0 2.8-1.9 4.6-4 4.6s-4-1.8-4-4.6c0-4 4-6 4-10z" fill="url(#diwali-flame)" />
      {/* bowl */}
      <ellipse cx="24" cy="21" rx="22" ry="3.4" fill="#7a1f10" />
      <path d="M3 21h42c0 6.6-9.4 11-21 11S3 27.6 3 21z" fill="url(#diwali-bowl)" />
    </svg>
  );
}

export function DiwaliBar() {
  return (
    <div className="diwali-bar" role="note" aria-label="Diwali greeting">
      <div className="diwali-bar__inner">
        <Diya />
        <span className="diwali-bar__text">
          Wishing you a bright &amp; prosperous <strong>Diwali</strong> — light up your shop with Adminuscurator
        </span>
        <Diya />
      </div>
    </div>
  );
}
