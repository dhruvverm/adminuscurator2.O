/** Logo mark for generated images (Open Graph, Apple touch icon). */
export function BrandMark({ size, primary, accent, radius = 0.28 }: { size: number; primary: string; accent: string; radius?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * radius,
        background: `linear-gradient(135deg, ${primary}, ${accent})`,
        display: "flex",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 32 32">
        <path d="M9.5 23.5 16 8.5l6.5 15" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="18.3" r="2.1" fill="#fff" />
      </svg>
    </div>
  );
}
