/**
 * Offline licence enforcement for Optical Shop Manager.
 *
 * A valid activation code unlocks the app for TRIAL_DAYS days from first use.
 * After that the app locks and asks for a new code; the shop's own data is
 * never touched. Each code's id is remembered on this device, so re-entering
 * the same code here (even after reinstalling) is refused.
 *
 * State lives in <userData>/license.json, signed with the app secret so it
 * cannot be edited by hand, and carries a "high-water" clock value so moving
 * the system date backwards is detected instead of granting extra time.
 */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const codes = require("./codes");
const SECRET = require("./secret");

const TRIAL_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;
const TRIAL_MS = TRIAL_DAYS * DAY_MS;
const SKEW_MS = 6 * 60 * 60 * 1000; // tolerate small backward clock moves (timezone/DST)

let FILE = null;
const setPath = (userDataDir) => { FILE = path.join(userDataDir, "license.json"); };

function sign(obj) {
  const { sig, ...rest } = obj; // eslint-disable-line no-unused-vars
  return crypto.createHmac("sha256", SECRET).update(JSON.stringify(rest)).digest("hex");
}

function load() {
  try {
    const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
    if (data.sig !== sign(data)) return { ...blank(), tampered: true };
    return { ...blank(), ...data };
  } catch {
    return blank();
  }
}

function blank() {
  return { deviceId: crypto.randomBytes(8).toString("hex"), used: {}, active: null, lastSeen: 0, tampered: false };
}

function save(state) {
  state.sig = sign(state);
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  const tmp = FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(state), "utf8");
  fs.renameSync(tmp, FILE);
}

/** Current status without changing anything. */
function status() {
  const state = load();
  const now = Date.now();

  // Clock moved backwards past tolerance → treat as tampering, lock.
  if (state.lastSeen && now < state.lastSeen - SKEW_MS) {
    return { state: "clock", message: "The system clock has been changed. Please set the correct date and time, then reopen the app." };
  }
  // Advance the high-water mark so a later rollback is caught.
  if (now > state.lastSeen) { state.lastSeen = now; try { save(state); } catch {} }

  if (state.tampered) return { state: "locked", message: "The licence file could not be verified. Please enter a valid activation code." };

  if (state.active) {
    // Lifetime and Online licences never expire.
    if (state.active.kind === "lifetime" || state.active.kind === "online" || state.active.expiresAt === null) {
      const k = state.active.kind || "lifetime";
      return { state: "active", kind: k, edition: k, online: k === "online", expiresAt: null, daysLeft: null };
    }
    const effectiveNow = Math.max(now, state.lastSeen);
    const remaining = state.active.expiresAt - effectiveNow;
    if (remaining > 0) {
      return { state: "active", kind: "trial", expiresAt: state.active.expiresAt, daysLeft: Math.ceil(remaining / DAY_MS) };
    }
    return { state: "expired", message: `Your ${TRIAL_DAYS}-day access has ended. Enter a new activation code to continue.` };
  }
  return { state: "none", message: "Enter your activation code to start." };
}

/** Try to activate with a code. Returns { ok, ... } and persists on success. */
function activate(input) {
  const state = load();
  const now = Date.now();

  if (state.lastSeen && now < state.lastSeen - SKEW_MS) {
    return { ok: false, code: "clock", message: "The system clock has been changed. Set the correct date and time, then try again." };
  }

  const parsed = codes.verify(input);
  if (!parsed) return { ok: false, code: "invalid", message: "That code is not valid. Please check it and try again." };
  const { id, kind } = parsed;

  // One code, one device, once: a code already used on this device cannot be used again.
  if (state.used[id]) {
    return { ok: false, code: "used", message: "This code has already been used on this device and cannot be used again." };
  }

  const startedAt = Math.max(now, state.lastSeen);
  const noExpiry = kind === "lifetime" || kind === "online";
  const expiresAt = noExpiry ? null : startedAt + TRIAL_MS;
  state.used[id] = { kind, activatedAt: startedAt, expiresAt };
  state.active = { id, kind, activatedAt: startedAt, expiresAt };
  state.lastSeen = startedAt;
  save(state);
  return { ok: true, kind, edition: kind, online: kind === "online", expiresAt, daysLeft: noExpiry ? null : TRIAL_DAYS };
}

module.exports = { setPath, status, activate, TRIAL_DAYS };
