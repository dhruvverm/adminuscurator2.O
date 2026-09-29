# SaaS Website

A complete, production-ready website for selling software: marketing site, accounts, checkout, a customer dashboard and an admin area.

Built with **Next.js 16 (App Router) + TypeScript** and plain CSS. The only runtime dependencies are `next`, `react` and `react-dom`: there's no UI kit, database driver or payment SDK.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

---

## What's included

| Area | Routes |
| --- | --- |
| Marketing | `/`, `/features`, `/solutions`, `/pricing`, `/about`, `/faq`, `/contact` |
| Legal (placeholder text) | `/legal/privacy`, `/legal/terms`, `/legal/cookies`, `/legal/refund` |
| Resources (placeholders) | `/resources/{integrations,updates,careers,documentation,blog,help-center}` |
| Accounts | `/signup`, `/login`, `/forgot-password`, `/reset-password`, optional Google sign-in |
| Purchase flow | `/pricing` → `/checkout` → payment provider → `/checkout/success` → `/dashboard` |
| Customer area | `/dashboard`, `/dashboard/billing`, `/dashboard/settings` |
| Admin | `/admin` overview, messages, orders, customers & roles, content editors |
| SEO | per-page metadata, canonical URLs, Open Graph/Twitter cards, `sitemap.xml`, `robots.txt`, JSON-LD |

---

## Editing content (no code knowledge needed for most of it)

| What | Where |
| --- | --- |
| Logo files: vector SVG (full colour, white, single colour, mark, app icon), PNG exports and a brand sheet | `public/brand/`. The favicon is `src/app/icon.svg` and the app icon is `src/app/apple-icon.tsx` |
| Company name, logo, **brand colors**, contact details, social links, SEO defaults | `src/config/site.ts` |
| Header & footer navigation | `src/config/site.ts` (`mainNav`, `footerNav`) |
| Hero, stats, problems, product tour, steps, benefits, security, use cases, final CTA, About page | `src/content/marketing.ts` |
| Plan comparison table | `src/content/comparison.ts` |
| Legal & resource pages | `src/content/pages.ts` |
| **Products, pricing plans, features, testimonials, FAQs** | Edit in **/admin → Content** (defaults live in `src/content/managed-defaults.ts`) |
| Real product screenshots | Put images in `/public` and set `image` on each item in `showcase` (`src/content/marketing.ts`) |

### Placeholders

Nothing about your business has been invented. Every number, price, testimonial, logo, contact detail and legal text is a **placeholder**, and the site marks it with an amber *Placeholder* tag. Sample testimonials are labelled *"Sample — not a real review"*.

When you've replaced everything, set `showPlaceholderTags: false` in `src/config/site.ts`.

Prices: leave a plan's price empty to show its placeholder label (e.g. `$XX`). Once both monthly and yearly prices are set, the yearly savings message is calculated automatically.

---

## Software downloads

The **/downloads** page lists your apps. Each card shows the logo, name, version, size, release date and the platforms it's available on.

Pressing **Download** never starts a download straight away:
1. A dialog asks *"Where do you want to download this software?"* with Mobile, Tablet and Laptop / Desktop options.
2. The visitor sees their chosen device and can change it (Back or **Change**). For desktop they pick Windows or macOS; the one matching their computer is pre-selected.
3. The download starts only when they press **Download Now**. Store links (App Store, Google Play) open in a new tab, and files on your own site download directly.

**Managing apps**
* **Full app:** use **/admin → Downloads**.
* **GitHub Pages site:** edit `defaultSoftware` in `src/content/managed-defaults.ts` and push.

Each app has a name, description, logo URL (or an icon), version, file size, release date, and Mobile / Tablet / Windows / macOS download URLs. **Leave a URL empty when that platform isn't available.** The option is then shown as "Not available" and can't be selected, so visitors never see a broken link. You can put installer files in `public/files/` and link them as `/files/your-app.dmg`.

**Currently listed: Optical Shop Manager 1.25.0**, free to download and use.
* Mobile and Tablet link to the signed Android app (`public/files/OpticalShopManager-1.25.0.apk`).
* Windows and macOS link to the single-file offline version (`public/files/OpticalShopManager-1.25.0.html`), which runs in Chrome, Edge or Safari.
* The dialog shows install help automatically: for an APK it covers Android's "install unknown apps" prompt, for the `.html` it explains how to open it, and iPhone/iPad visitors are pointed to the browser version.

**Releasing a new version:** build it in the optical-shop project, copy the new `.apk` and `.html` into `public/files/` with the new version in the file names, update `version`, `fileSize`, `releaseDate` and the four URLs in `defaultSoftware`, then push.

Each app can have a **License** line (e.g. "Free to download and use"). It appears on the card and in the download dialog.

Every **Download Now** click is tracked as a `download` analytics event.

## Admin & roles

On first start, an administrator is created from `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Sign in at `/login`.

| Role | Can access |
| --- | --- |
| `admin` | Everything, including orders and changing user roles |
| `editor` | Content editors and contact messages |
| `customer` | Their own dashboard only |

Roles are enforced on the server in every admin page and server action. `src/proxy.ts` only does a quick early redirect.

---

## Payments

Card details are **never** collected or stored by this app. Customers pay on the provider's hosted checkout page.

* **Stripe** (built in): set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` and a Price ID for each plan/interval (`STRIPE_PRICE_STARTER_MONTHLY`, …). Point a Stripe webhook at `/api/webhooks/stripe` for `checkout.session.completed` and `checkout.session.expired`.
* **Demo mode**: with no Stripe key and `PAYMENTS_DEMO_MODE=true`, checkout completes without taking payment, so you can test the flow. It is always disabled in production.
* **Another provider**: implement the `PaymentProvider` interface in `src/lib/payments/` and return it from `getPaymentProvider()`.

## Google sign-in (optional)

Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, and add `{SITE_URL}/api/auth/google/callback` as an authorized redirect URI. The button only appears once these are set.

## Analytics

Set any of `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_META_PIXEL_ID`. Scripts load **only after the visitor accepts** the cookie banner, and the banner only appears when at least one ID is configured.

Tracked conversion events are `cta_click`, `sign_up`, `select_plan`, `begin_checkout`, `purchase` and `contact_submit`. To track another element, add `data-track="cta_click" data-track-label="…"` to it.

## Email

Password-reset emails and contact-form notifications go through `src/lib/email.ts`. In development they're printed to the server console. Plug in your provider (Resend, Postmark, SES…) there before launch.

---

## Hosting

### GitHub Pages (live now: marketing site only)

`.github/workflows/pages.yml` publishes a **static** version of the site on every push to `main`. It builds with `NEXT_PUBLIC_STATIC_EXPORT=true`.

GitHub Pages can't run a server, so the static build:
* includes every marketing, pricing, legal and resource page;
* leaves out sign-up, login, checkout, the customer dashboard and admin (`scripts/prepare-static.mjs` removes them in CI only);
* sends "Get Started" and plan buttons to the contact form;
* sends the contact form to a form service. Set a repository **Actions variable** `FORM_ENDPOINT` (e.g. a Formspree URL). Without it, the form opens the visitor's email app pre-filled.

Admin edits don't apply to the static site. Edit prices, features, testimonials and FAQs in `src/content/managed-defaults.ts` and push. Analytics IDs can be set as the Actions variables `GA_MEASUREMENT_ID`, `GTM_ID` and `META_PIXEL_ID`.

### Full app (accounts, checkout, admin)

This needs a Node host. Render or Railway with a persistent disk works as-is. Vercel needs a database in place of the JSON store (see below). Deploy with `npm run build && npm start` and the environment variables from `.env.example`.

## Data storage

`src/lib/store.ts` is a small JSON-file store at `data/store.json` (git-ignored) that holds users, orders, messages and admin-edited content. It suits development and single-server hosting.

For serverless or multi-instance hosting (e.g. Vercel), re-implement that module against a real database. Every data access goes through it.

## Security notes

* Passwords are hashed with scrypt. Sessions are HMAC-signed, httpOnly cookies, and changing a password or role signs out other sessions.
* Rate limiting is in place for login, signup, password reset and the contact form. It's in-memory, so use Redis for multiple instances.
* The contact form has a honeypot field, redirects are open-redirect safe, and security headers are set in `next.config.ts`.

## Before launch checklist

- [ ] Replace everything in `src/config/site.ts` and `src/content/*`
- [ ] Set real prices in **/admin → Pricing** and create matching Stripe Prices
- [ ] Replace the legal pages with policies reviewed by counsel
- [ ] Add real testimonials, or remove the section
- [ ] Set `AUTH_SECRET` to a long random value and `NEXT_PUBLIC_SITE_URL` to your domain
- [ ] Configure email, analytics IDs, and a database for serverless hosting
- [ ] Set `showPlaceholderTags: false`
