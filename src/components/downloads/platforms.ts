import type { IconName } from "@/components/ui/Icon";
import type { Software } from "@/content/types";

export type Device = "mobile" | "tablet" | "desktop";
export type DesktopOs = "windows" | "mac";

export const DEVICES: { id: Device; label: string; hint: string; icon: IconName }[] = [
  { id: "mobile", label: "Mobile", hint: "Phone", icon: "smartphone" },
  { id: "tablet", label: "Tablet", hint: "iPad & Android tablets", icon: "tablet" },
  { id: "desktop", label: "Laptop / Desktop", hint: "Windows & macOS", icon: "laptop" },
];

export const DESKTOP_OS: { id: DesktopOs; label: string; icon: IconName }[] = [
  { id: "windows", label: "Windows", icon: "windows" },
  { id: "mac", label: "macOS", icon: "apple" },
];

const clean = (u?: string) => (u && u.trim() ? u.trim() : null);

/** Download URL for a device (and OS, for desktop) or null if unavailable. */
export function downloadUrl(sw: Software, device: Device, os?: DesktopOs): string | null {
  if (device === "mobile") return clean(sw.mobileUrl);
  if (device === "tablet") return clean(sw.tabletUrl);
  if (os === "windows") return clean(sw.windowsUrl);
  if (os === "mac") return clean(sw.macUrl);
  return clean(sw.windowsUrl) ?? clean(sw.macUrl);
}

export function availableOs(sw: Software): DesktopOs[] {
  return DESKTOP_OS.filter((o) => downloadUrl(sw, "desktop", o.id)).map((o) => o.id);
}

export function isDeviceAvailable(sw: Software, device: Device) {
  return device === "desktop" ? availableOs(sw).length > 0 : !!downloadUrl(sw, device);
}

/** Platform labels shown on the card, e.g. ["Mobile", "Tablet", "Windows"]. */
export function platformBadges(sw: Software): { label: string; icon: IconName }[] {
  const out: { label: string; icon: IconName }[] = [];
  if (downloadUrl(sw, "mobile")) out.push({ label: "Mobile", icon: "smartphone" });
  if (downloadUrl(sw, "tablet")) out.push({ label: "Tablet", icon: "tablet" });
  if (downloadUrl(sw, "desktop", "windows")) out.push({ label: "Windows", icon: "windows" });
  if (downloadUrl(sw, "desktop", "mac")) out.push({ label: "macOS", icon: "apple" });
  return out;
}

export function formatDate(iso?: string) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}
