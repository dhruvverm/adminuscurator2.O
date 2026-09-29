import type { Software } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { withBasePath } from "@/lib/urls";

/** App logo image, or the app's icon on a brand-gradient tile. */
export function SoftwareLogo({ software, size = 56 }: { software: Pick<Software, "logo" | "icon">; size?: number }) {
  if (software.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={withBasePath(software.logo)} alt="" width={size} height={size} className="sw-logo" loading="lazy" decoding="async" />
    );
  }
  return (
    <span className="sw-logo sw-logo--tile" style={{ width: size, height: size }} aria-hidden="true">
      <Icon name={software.icon} size={Math.round(size * 0.46)} strokeWidth={1.9} />
    </span>
  );
}
