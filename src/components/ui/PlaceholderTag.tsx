import { siteConfig } from "@/config/site";

/** Visibly marks content that must be replaced with real information. */
export function PlaceholderTag({ label = "Placeholder", show = true }: { label?: string; show?: boolean }) {
  if (!show || !siteConfig.showPlaceholderTags) return null;
  return (
    <span className="placeholder-tag" title="Placeholder content — replace before launch">
      {label}
    </span>
  );
}
