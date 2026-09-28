import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ResetForm } from "./ResetForm";

export const metadata = pageMetadata({ title: "Choose a new password", description: "Set a new password.", path: "/reset-password", noIndex: true });

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <>
      <h1>Choose a new password</h1>
      {token ? (
        <>
          <p>Enter a new password for your account.</p>
          <ResetForm token={token} />
        </>
      ) : (
        <div className="form">
          <div className="alert alert--error" role="alert">This reset link is missing or invalid.</div>
          <Link href="/forgot-password" className="btn btn--primary btn--lg btn--block">Request a new link</Link>
        </div>
      )}
    </>
  );
}
