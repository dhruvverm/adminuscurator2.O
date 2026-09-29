/**
 * Activation-code scheme (offline).
 *
 * A code carries a random id and an HMAC check value, so the app can tell a
 * genuine code from a random guess without any server. Codes are generated
 * with `npm run gen-code`. The code's id is what the app records as "used",
 * so the same code can never be activated twice on one device.
 */
const crypto = require("node:crypto");
const SECRET = require("./secret");

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford base32 (no I,L,O,U)
const ID_BYTES = 5; // 40 bits of randomness
const CHECK_BYTES = 4;

function toBase32(buf) {
  let bits = 0, value = 0, out = "";
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
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
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

function checkFor(idBuf) {
  return crypto.createHmac("sha256", SECRET).update(idBuf).digest().subarray(0, CHECK_BYTES);
}

/** Creates a new genuine activation code. */
function generate() {
  const id = crypto.randomBytes(ID_BYTES);
  const body = Buffer.concat([id, checkFor(id)]);
  return format(toBase32(body));
}

/** Adds the "#" and dashes for readability, e.g. "#A98S-KTV3-45DS". */
function format(raw) {
  return "#" + raw.replace(/(.{4})/g, "$1-").replace(/-$/, "");
}

/** Normalizes anything the user typed to the raw base32 body. */
function normalize(input) {
  return String(input || "").toUpperCase().replace(/[^0-9A-Z]/g, "")
    .replace(/O/g, "0").replace(/[IL]/g, "1").replace(/U/g, "V");
}

/** Returns the code's unique id (hex) if genuine, otherwise null. */
function verify(input) {
  const raw = normalize(input);
  const buf = fromBase32(raw);
  if (!buf || buf.length < ID_BYTES + CHECK_BYTES) return null;
  const id = buf.subarray(0, ID_BYTES);
  const check = buf.subarray(ID_BYTES, ID_BYTES + CHECK_BYTES);
  const expected = checkFor(id);
  if (check.length !== expected.length || !crypto.timingSafeEqual(check, expected)) return null;
  return id.toString("hex");
}

module.exports = { generate, verify, normalize, format };
