/**
 * Generate activation codes for Optical Shop Manager.
 * Usage:
 *   npm run gen-code                 one 7-day code
 *   npm run gen-code -- 10           ten 7-day codes
 *   npm run gen-code -- lifetime     one lifetime code
 *   npm run gen-code -- lifetime 5   five lifetime codes
 */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const codes = require("../license/codes.js");

const args = process.argv.slice(2).map((a) => a.toLowerCase());
const kind = args.includes("online") ? "online" : (args.includes("lifetime") ? "lifetime" : "trial");
const count = Math.max(1, Math.min(500, parseInt(args.find((a) => /^\d+$/.test(a)) || "1", 10)));

console.log(kind === "online" ? "# Online (WhatsApp) codes:" : kind === "lifetime" ? "# Lifetime codes:" : "# 7-day codes:");
for (let i = 0; i < count; i++) console.log(codes.generate(kind));
