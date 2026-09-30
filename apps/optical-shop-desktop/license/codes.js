/**
 * Activation-code scheme (offline).
 *
 * A code carries a random id, a "kind" byte (trial or lifetime) and an HMAC
 * check value, so the app can tell a genuine code from a random guess — and
 * whether it grants 7 days or lifetime access — without any server.
 * Codes are generated with `npm run gen-code`. The code's id is what the app
 * records as "used", so a code can never be activated twice on one device.
 */
const crypto = require("node:crypto");
const SECRET = require("./secret");

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford base32 (no I,L,O,U)
const ID_BYTES = 5; // 40 bits of randomness
const CHECK_BYTES = 4;
const KIND = { 0: "trial", 1: "lifetime" };
const KIND_BYTE = { trial: 0, lifetime: 1 };

function toBase32(buf) {
  let bits = 0, value = 0, out = "";
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) { out += ALPHABET[(value >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

function fromBase32(str) {
  let bits = 0, value = 0;
  const out = [];
  for (const ch of str) {
    const idx = ALPHABET.indexOf(ch);
    if (idx < 0) return null;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) { out.push((value >>> (bits - 8)) & 0xff); bits -= 8; }
  }
  return Buffer.from(out);
}

function checkFor(body) {
  return crypto.createHmac("sha256", SECRET).update(body).digest().subarray(0, CHECK_BYTES);
}

/** Creates a new genuine code. kind = "trial" (default) or "lifetime". */
function generate(kind = "trial") {
  const k = KIND_BYTE[kind];
  if (k === undefined) throw new Error("Unknown code kind: " + kind);
  const id = crypto.randomBytes(ID_BYTES);
  const body = Buffer.concat([id, Buffer.from([k])]);
  return format(toBase32(Buffer.concat([body, checkFor(body)])));
}

/** Adds "#" and dashes for readability, e.g. "#A98S-KTV3-45DS". */
function format(raw) {
  return "#" + raw.replace(/(.{4})/g, "$1-").replace(/-$/, "");
}

/** Normalizes anything the user typed to the raw base32 body. */
function normalize(input) {
  return String(input || "").toUpperCase().replace(/[^0-9A-Z]/g, "")
    .replace(/O/g, "0").replace(/[IL]/g, "1").replace(/U/g, "V");
}

/**
 * Returns { id, kind } if the code is genuine, otherwise null.
 * Supports the current format (id + kind + check) and the older trial-only
 * format (id + check) so early codes keep working.
 */
function verify(input) {
  const buf = fromBase32(normalize(input));
  if (!buf) return null;

  // Current format: 5 (id) + 1 (kind) + 4 (check) = 10 bytes.
  if (buf.length >= ID_BYTES + 1 + CHECK_BYTES) {
    const body = buf.subarray(0, ID_BYTES + 1);
    const check = buf.subarray(ID_BYTES + 1, ID_BYTES + 1 + CHECK_BYTES);
    const expected = checkFor(body);
    if (check.length === expected.length && crypto.timingSafeEqual(check, expected)) {
      const kind = KIND[body[ID_BYTES]];
      if (kind) return { id: body.subarray(0, ID_BYTES).toString("hex"), kind };
    }
  }
  // Legacy format: 5 (id) + 4 (check) = 9 bytes, always a trial.
  if (buf.length === ID_BYTES + CHECK_BYTES) {
    const id = buf.subarray(0, ID_BYTES);
    const check = buf.subarray(ID_BYTES, ID_BYTES + CHECK_BYTES);
    const expected = checkFor(id);
    if (crypto.timingSafeEqual(check, expected)) return { id: id.toString("hex"), kind: "trial" };
  }
  return null;
}

module.exports = { generate, verify, normalize, format };
