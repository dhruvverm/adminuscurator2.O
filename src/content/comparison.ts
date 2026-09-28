/**
 * Plan comparison table. Cell values:
 *   true  → included (checkmark)
 *   false → not included (dash)
 *   string → shown as text (PLACEHOLDER values in [brackets])
 * Columns follow plan ids: starter, professional, business.
 */
export type Cell = boolean | string;

export const comparisonRows: { feature: string; starter: Cell; professional: Cell; business: Cell }[] = [
  { feature: "Users", starter: "[Up to X]", professional: "[Up to X]", business: "Custom" },
  { feature: "Storage", starter: "[X GB]", professional: "[X GB]", business: "Custom" },
  { feature: "Automation", starter: "Basic", professional: true, business: true },
  { feature: "Analytics", starter: true, professional: true, business: true },
  { feature: "Reports", starter: "Standard", professional: "Advanced", business: "Advanced" },
  { feature: "Integrations", starter: "[X included]", professional: true, business: true },
  { feature: "Support", starter: "Email", professional: "Priority", business: "Dedicated" },
  { feature: "Advanced Features", starter: false, professional: true, business: true },
  { feature: "Customization", starter: false, professional: "Limited", business: true },
];
