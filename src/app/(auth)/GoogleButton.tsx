import { Icon } from "@/components/ui/Icon";

/** Rendered only when GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET are configured. */
export function GoogleButton({ next, label = "Continue with Google" }: { next?: string; label?: string }) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) return null;
  const href = `/api/auth/google${next ? `?next=${encodeURIComponent(next)}` : ""}`;
  return (
    <>
      {/* Plain anchor: this is a full-page redirect to Google, not a client navigation. */}
      <a href={href} className="btn btn--secondary btn--lg btn--block">
        <Icon name="google" size={18} />
        {label}
      </a>
      <div className="divider">or continue with email</div>
    </>
  );
}
