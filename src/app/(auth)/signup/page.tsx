import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, safeNext } from "@/lib/auth";
import { pageMetadata } from "@/lib/seo";
import { GoogleButton } from "../GoogleButton";
import { SignupForm } from "./SignupForm";

export const metadata = pageMetadata({
  title: "Create your account",
  description: "Create your account and set up your workspace in minutes.",
  path: "/signup",
});

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const dest = safeNext(next);
  if (await getCurrentUser()) redirect(dest);
  return (
    <>
      <h1>Create your account</h1>
      <p>Get set up in minutes. No complicated setup required.</p>
      <div className="form">
        <GoogleButton next={dest} label="Sign up with Google" />
        <SignupForm next={dest} />
      </div>
      <p className="auth__switch">
        Already have an account? <Link href={`/login${next ? `?next=${encodeURIComponent(dest)}` : ""}`}>Log in</Link>
      </p>
    </>
  );
}
