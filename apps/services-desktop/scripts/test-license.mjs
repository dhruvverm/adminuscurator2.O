/* Self-test for the offline licence rules (run in CI). Exits non-zero on failure. */
import { createRequire } from "node:module";
import os from "node:os";
import fs from "node:fs";
const require = createRequire(import.meta.url);

const realNow = Date.now();
let fake = realNow;
Date.now = () => fake;

const m = require("../license/manager.js");
const c = require("../license/codes.js");
m.setPath(fs.mkdtempSync(os.tmpdir() + "/lic-ci-"));

let failed = 0;
const check = (name, cond) => { console.log((cond ? "ok   " : "FAIL ") + name); if (!cond) failed++; };
const DAY = 86400000;

check("starts with no licence", m.status().state === "none");
check("rejects a random code", m.activate("#ZZZZ-ZZZZ-ZZZZ").code === "invalid");

const code = c.generate();
check("activates a genuine code", m.activate(code).ok === true);
check("active with 7 days left", m.status().state === "active" && m.status().daysLeft === 7);
check("refuses the same code again", m.activate(code).code === "used");

fake = realNow + 8 * DAY;
check("locks after 7 days", m.status().state === "expired");

check("a new code unlocks again", m.activate(c.generate()).ok === true);
check("active again", m.status().state === "active");

fake = realNow + 3 * DAY; // clock moved backwards
check("detects clock rollback", m.status().state === "clock");

// Lifetime code: never expires.
fake = realNow;
const m2 = require("../license/manager.js");
m2.setPath(fs.mkdtempSync(os.tmpdir() + "/lic-life-"));
const life = c.generate("lifetime");
check("activates a lifetime code", m2.activate(life).kind === "lifetime");
check("lifetime shows no days left", m2.status().state === "active" && m2.status().kind === "lifetime" && m2.status().daysLeft === null);
fake = realNow + 4000 * DAY; // ~11 years later
check("lifetime still active years later", m2.status().state === "active");
check("lifetime code not reusable on same device", m2.activate(life).code === "used");

process.exit(failed ? 1 : 0);
