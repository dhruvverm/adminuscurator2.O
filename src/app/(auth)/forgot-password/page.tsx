import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ForgotForm } from "./ForgotForm";

export const metadata = pageMetadata({ title: "Reset your password", description: "Reset your account password.", path: "/forgot-password", noIndex: true });

export default function ForgotPasswordPage() {
  return (
    <>
      <h1>Forgot your password?</h1>
      <p>Enter the email you signed up with and we&apos;ll send you a link to reset it.</p>
      <ForgotForm />
      <p className="auth__switch">
        Remembered it? <Link href="/login">Back to log in</Link>
      </p>
    </>
  );
}
