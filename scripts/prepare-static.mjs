/**
 * Prepares a server-less build (GitHub Pages) by removing routes that
 * need a server: accounts, checkout, dashboard, admin, API and the proxy.
 * Run only in CI on a throwaway checkout — it deletes files.
 */
import { rmSync, writeFileSync } from "node:fs";

if (!process.env.CI) {
  console.error("Refusing to run outside CI: this script deletes source files.");
  process.exit(1);
}
for (const p of ["src/app/(auth)", "src/app/(checkout)", "src/app/(app)", "src/app/api", "src/proxy.ts"]) {
  rmSync(p, { recursive: true, force: true });
  console.log("removed", p);
}

// Static export can't include Server Actions. The contact form uses its
// client-side sender in static mode, so the server action becomes a stub.
writeFileSync(
  "src/app/actions/contact.ts",
  `import type { FormState } from "@/lib/validation";

export async function submitContact(_prev: FormState, _form: FormData): Promise<FormState> {
  throw new Error("submitContact is unavailable in the static build");
}
`,
);
console.log("stubbed src/app/actions/contact.ts");
