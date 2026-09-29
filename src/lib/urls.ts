/**
 * Prefixes site-relative URLs (e.g. "/files/app.dmg") with the deploy base
 * path. next/link does this automatically, but plain <a>/<img> tags don't —
 * needed when the site is served from a sub-path such as GitHub Pages.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(url: string) {
  return url.startsWith("/") && !url.startsWith("//") ? `${BASE_PATH}${url}` : url;
}

export function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url);
}

/** True for links to an installer/file (downloads in place) vs. a web/store page. */
export function isDirectFile(url: string) {
  return /\.(apk|aab|exe|msi|msix|dmg|pkg|zip|appimage|deb|rpm|html|txt|pdf)$/i.test(url.split(/[?#]/)[0]);
}
