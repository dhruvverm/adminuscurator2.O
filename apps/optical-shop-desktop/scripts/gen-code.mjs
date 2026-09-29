/**
 * Generate activation codes for Optical Shop Manager.
 * Usage:  npm run gen-code            (one code)
 *         npm run gen-code -- 10      (ten codes)
 */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const codes = require("../license/codes.js");

const n = Math.max(1, Math.min(500, parseInt(process.argv[2] || "1", 10) || 1));
for (let i = 0; i < n; i++) console.log(codes.generate());
