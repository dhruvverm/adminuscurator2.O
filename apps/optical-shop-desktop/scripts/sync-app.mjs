/**
 * Copies the latest single-file build of Optical Shop Manager into app/.
 * Usage: npm run sync -- /path/to/optical-shop/dist/OpticalShopManager.html
 */
import { copyFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const src = process.argv[2];
if (!src) {
  console.error("Pass the path to OpticalShopManager.html");
  process.exit(1);
}
const dest = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "app", "index.html");
copyFileSync(src, dest);
console.log(`Copied ${(statSync(dest).size / 1024).toFixed(0)} KB → app/index.html. Remember to bump "version" in package.json.`);
