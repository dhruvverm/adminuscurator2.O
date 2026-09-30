/**
 * Secret used to sign and verify activation codes (offline HMAC scheme).
 *
 * ⚠️ Anyone who extracts this secret from the app could mint their own codes.
 * That is an inherent limit of an offline, no-server licence check — it is
 * good enough to stop ordinary users past the 7 days, not a determined
 * attacker. For strict enforcement, move validation to a licence server.
 *
 * Keep this file private. Changing it invalidates every code already issued.
 */
module.exports = require("node:fs").readFileSync(require("node:path").join(__dirname, "secret.key"), "utf8").trim();
