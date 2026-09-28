import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, safeNext } from "@/lib/auth";
import { pageMetadata } from "@/lib/seo";
import { GoogleButton } from "../GoogleButton";
import { LoginForm } from "./LoginForm";

export const metadata = pageMetadata({ title: "Log in", description: "Log in to your account.", path: "/login", noIndex: true });

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  const dest = safeNext(next);
  if (await getCurrentUser()) redirect(dest);
  return (
    <>
      <h1>Welcome back</h1>
      <p>Log in to continue to your workspace.</p>
      <div className="form">
        {error === "oauth" && (
          <div className="alert alert--error" role="alert">Google sign-in didn&apos;t complete. Please try again.</div>
        )}
        <GoogleButton next={dest} />
        <LoginForm next={dest} />
      </div>
      <p className="auth__switch">
        New here? <Link href={`/signup${next ? `?next=${encodeURIComponent(dest)}` : ""}`}>Create an account</Link>
      </p>
    </>
  );
}
