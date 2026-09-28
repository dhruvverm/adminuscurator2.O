import { MARK } from "@/components/ui/Logo";

/** Logo mark for generated images (Open Graph, Apple touch icon). */
export function BrandMark({ size, colors }: { size: number; colors: { base: string; mid: string; cap: string; baseOp?: number; midOp?: number } }) {
  const block = (d: string, fill: string, opacity = 1) => (
    <path key={d} d={d} fill={fill} stroke={fill} strokeWidth="2.5" strokeLinejoin="round" opacity={opacity} />
  );
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      {MARK.base.map((d) => block(d, colors.base, colors.baseOp))}
      {MARK.mid.map((d) => block(d, colors.mid, colors.midOp))}
      {block(MARK.cap, colors.cap)}
    </svg>
  );
}
