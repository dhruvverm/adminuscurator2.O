# Optical Shop Manager — desktop app

An [Electron](https://www.electronjs.org/) wrapper around the offline
single-file web app (`app/index.html`). It installs like a normal program and
opens from the Start menu / Applications.

## Activation codes (7-day access)

The app opens to an **activation screen**. A valid code unlocks it for **7 days
from first use**. After that it locks and asks for a new code — the shop's data
is never touched. Re-entering the same code on the same computer (even after
reinstalling) is refused.

### Generate codes

```bash
npm run gen-code        # one code, e.g. #A98S-KTV3-45DS
npm run gen-code -- 20  # twenty codes
```

Give one code to each customer. Every code is single-use per device.

### How enforcement works (and its limits)

This is an **offline** check — no server, no internet needed.

* Codes are signed with the secret in `license/secret.key`, so the app can tell
  a genuine code from a random one.
* Each used code's id, the activation time and a "high-water" clock value are
  stored (signed) in the app's data folder. Moving the system clock backwards is
  detected and locks the app.
* **Limits of any offline scheme:** a determined user who deletes the app's data
  folder can start a fresh trial with a *new* code, and anyone who extracts
  `secret.key` from the app could mint codes. This stops ordinary users past the
  7 days; it is not proof against a technical attacker. For strict enforcement
  (blocking reinstall-reuse everywhere, no local clock trust), the codes need a
  small licence server.
* **Keep `license/secret.key` private.** Changing it invalidates every code
  already issued.

## Develop / build

```bash
npm start           # run the app locally
npm run test-license # run the licence-rule self-test
npm run sync -- /path/to/OpticalShopManager.html   # pull in a new web build
```

Installers are built in CI (`.github/workflows/optical-shop-desktop.yml`) for
Windows (.exe) and macOS (.dmg) and published to the `optical-shop-v<version>`
GitHub Release.
