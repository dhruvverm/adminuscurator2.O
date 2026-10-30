/**
 * Default values for content that administrators can also edit in /admin.
 * Once an admin saves changes, the saved version (in the data store)
 * takes precedence over these defaults.
 */
import type { Faq, Feature, ManagedContent, Plan, Product, Software, Testimonial } from "./types";

export const defaultFeatures: Feature[] = [
  {
    id: "billing",
    icon: "fileText",
    title: "Offline Billing & Invoices",
    description: "Create bills and instant invoices in seconds — print to thermal (58/80 mm) or A5, or share on WhatsApp.",
    href: "/features#billing",
  },
  {
    id: "stock",
    icon: "layers",
    title: "Stock & Inventory",
    description: "Track products and quantities with low-stock alerts, and bulk-import your inventory from Excel or CSV.",
    href: "/features#stock",
  },
  {
    id: "customers",
    icon: "users",
    title: "Customers & Udhaar",
    description: "Keep customer records and track credit (udhaar) so you always know who owes what.",
    href: "/features#customers",
  },
  {
    id: "reports",
    icon: "chart",
    title: "Sales & Profit Reports",
    description: "See daily sales, collections, expenses and profit — clear reports with no spreadsheets.",
    href: "/features#reports",
  },
  {
    id: "offline",
    icon: "shield",
    title: "Works 100% Offline",
    description: "No internet or account needed — the whole app runs on your own device, and your data stays there.",
    href: "/features#offline",
  },
  {
    id: "backup",
    icon: "refresh",
    title: "Backup & Restore",
    description: "Save a backup file any time and restore it when you change or reset your device.",
    href: "/features#backup",
  },
  {
    id: "pos",
    icon: "zap",
    title: "Fast Point-of-Sale",
    description: "Tap or scan products into a cart and take payment in seconds at a busy counter.",
    href: "/features#pos",
  },
  {
    id: "editions",
    icon: "store",
    title: "Four Shop Editions",
    description: "Optical, Retail, Services and POS — choose the edition built for your kind of shop.",
    href: "/features#editions",
  },
];

/**
 * Every plan includes the full software — only the length of access differs.
 * Prices are a one-time payment in Indian Rupees.
 */
const ALL_FEATURES = [
  "Every feature included — nothing locked",
  "Offline billing & instant invoices",
  "Unlimited customers & credit (udhaar) tracking",
  "Products & stock management",
  "Payments tracked on every bill",
  "Sales, profit & business reports",
  "Automatic backup & restore",
  "Thermal (58/80 mm) & A5 invoice printing",
  "WhatsApp invoice sharing",
  "Works on Android, Windows & Mac",
  "Free updates & support",
];

export const defaultPlans: Plan[] = [
  {
    id: "monthly",
    name: "1 Month",
    tagline: "Full access for one month.",
    priceMonthly: 1500,
    priceYearly: null,
    priceLabel: "₹1,500",
    currency: "INR",
    period: "for 1 month",
    kind: "self-serve",
    cta: "Get Started",
    highlighted: false,
    features: ALL_FEATURES,
  },
  {
    id: "halfyear",
    name: "6 Months",
    tagline: "Best for a full season of billing.",
    priceMonthly: 8000,
    priceYearly: null,
    priceLabel: "₹8,000",
    currency: "INR",
    period: "for 6 months",
    kind: "self-serve",
    cta: "Get Started",
    highlighted: true,
    badge: "Most Popular",
    features: ALL_FEATURES,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    tagline: "Pay once, use forever.",
    priceMonthly: 25000,
    priceYearly: null,
    priceLabel: "₹25,000",
    currency: "INR",
    period: "one-time",
    kind: "self-serve",
    cta: "Get Lifetime",
    highlighted: false,
    badge: "Best Value",
    features: ALL_FEATURES,
  },
];

/**
 * SAMPLE testimonials. These are NOT real customer reviews and are
 * labelled as samples on the site until replaced (set isPlaceholder: false
 * only for genuine, approved quotes).
 */
// No sample/fake reviews are shown. Add genuine, approved customer quotes here
// (with isPlaceholder: false) and the "What our customers say" section will appear.
export const defaultTestimonials: Testimonial[] = [];

export const defaultFaqs: Faq[] = [
  {
    id: "what",
    question: "What is Adminuscurator?",
    answer:
      "Adminuscurator is offline business-management software that helps you run everyday operations — billing, inventory, customers, credit (udhaar), expenses and reports — all in one place, so your business stays simple and organised.",
  },
  {
    id: "editions",
    question: "Which businesses is it for, and what editions are available?",
    answer:
      "There are four editions: POS (any shop or counter), Optical (optical shops), Retail (clothing with size & colour variants) and Services (service price lists & appointments). Choose the one that fits your business on the Downloads page.",
  },
  {
    id: "offline",
    question: "Does it work offline, and do I need an account?",
    answer:
      "Yes — Adminuscurator runs fully offline with no account and no sign-up, and your data stays on your own device. Only optional integrations such as WhatsApp need an internet connection.",
  },
  {
    id: "devices",
    question: "Which devices are supported?",
    answer:
      "Android phones and tablets, Windows computers, and Mac. Download the version that matches your device from the Downloads page.",
  },
  {
    id: "billing",
    question: "Can I create bills and manage inventory?",
    answer:
      "Yes. Create bills and share them on WhatsApp or print to thermal (58/80 mm) and A5 printers, and manage products and stock with low-stock alerts. The POS edition can also bulk-import inventory from Excel (.xlsx) and CSV. Note: Adminuscurator does not provide GST billing.",
  },
  {
    id: "udhaar",
    question: "Can I track customer credit (udhaar)?",
    answer:
      "Yes. Keep customer records and track outstanding balances and payments, so you always know who owes what and stay on top of credit.",
  },
  {
    id: "pricing",
    question: "What does it cost?",
    answer:
      "One-time payments with no automatic renewal: ₹1,500 for 1 month, ₹8,000 for 6 months, and ₹25,000 for a lifetime licence. Every feature is included in every plan. Prices are in Indian rupees and exclude applicable taxes.",
  },
  {
    id: "backup",
    question: "Does it back up my data and get updates?",
    answer:
      "Yes. Built-in backup & restore lets you save your business data safely before updating or switching devices, and every plan includes free updates and support.",
  },
];

export const defaultProducts: Product[] = [
  {
    id: "platform",
    name: "Adminuscurator",
    summary: "Offline billing, inventory, customers, credit (udhaar), expenses and reports — in free apps for Android, Windows and Mac.",
    status: "active",
  },
];

/**
 * Downloadable apps (Downloads page). Put installer files in /public/files
 * and link them as "/files/…", or use store URLs. Leave a platform's URL
 * empty when it isn't available — that option is then disabled.
 */
const RELEASE = "https://github.com/dhruvverm/adminuscurator2.O/releases/download/adminuscurator-v1.25.11";
const RETAIL_RELEASE = "https://github.com/dhruvverm/adminuscurator2.O/releases/download/adminuscurator-retail-v1.25.8";
const SERVICES_RELEASE = "https://github.com/dhruvverm/adminuscurator2.O/releases/download/adminuscurator-services-v1.25.8";
const POS_RELEASE = "https://github.com/dhruvverm/adminuscurator2.O/releases/download/adminuscurator-pos-v1.25.15";

export const defaultSoftware: Software[] = [
  {
    id: "adminuscurator-pos",
    name: "Adminuscurator POS",
    description:
      "A fast, offline point-of-sale for any shop or counter: tap or scan products into a cart and take payment in seconds. Bulk-upload your inventory from an Excel (.xlsx) or CSV file. An optional restaurant/tables mode holds a separate order per table. Add your own WhatsApp API to auto-send bills and run campaigns, with a Swiggy/Zomato order inbox tagged by channel. Includes inventory, billing, customers, credit, expenses, reports and backup. Works on Android, Windows and Mac — no internet or account needed.",
    logo: "/brand/app-icon.svg",
    icon: "store",
    version: "1.25.15",
    releaseDate: "2026-10-06",
    mobileUrl: "/files/Adminuscurator-POS-1.25.11.apk",
    mobileSize: "204 KB",
    tabletUrl: "/files/Adminuscurator-POS-1.25.11.apk",
    tabletSize: "204 KB",
    // Desktop installers — built by .github/workflows/pos-desktop.yml
    windowsUrl: `${POS_RELEASE}/AdminuscuratorPOS-Setup-1.25.15.exe`,
    windowsSize: "106 MB",
    macUrl: `${POS_RELEASE}/AdminuscuratorPOS-1.25.15-mac.dmg`,
    macSize: "218 MB",
    license: "Free to download and use",
    isPlaceholder: false,
  },
  {
    id: "adminuscurator-optical",
    name: "Adminuscurator Optical",
    description:
      "Offline management and accounting for optical shops: customers, prescriptions, stock, billing, credit, expenses and reports. Installs as an app on Android, Windows and Mac; no internet or account needed, and your data stays on your device.",
    logo: "/brand/app-icon.svg",
    icon: "eye",
    version: "1.25.11",
    releaseDate: "2026-10-28",
    // Android app (APK) for phones and tablets — served from this site
    mobileUrl: "/files/Adminuscurator-1.25.4.apk",
    mobileSize: "200 KB",
    tabletUrl: "/files/Adminuscurator-1.25.4.apk",
    tabletSize: "200 KB",
    // Desktop installers — built by .github/workflows/optical-shop-desktop.yml
    windowsUrl: `${RELEASE}/Adminuscurator-Setup-1.25.11.exe`,
    windowsSize: "106 MB",
    macUrl: `${RELEASE}/Adminuscurator-1.25.11-mac.dmg`,
    macSize: "218 MB",
    license: "Free to download and use",
    isPlaceholder: false,
  },
  {
    id: "adminuscurator-retail",
    name: "Adminuscurator Retail",
    description:
      "Offline management and accounting for clothing shops: products with size & colour variants, per-variant stock and low-stock alerts, billing, credit, customers, expenses and reports. Works on Android, Windows and Mac — no internet or account needed.",
    logo: "/brand/app-icon.svg",
    icon: "store",
    version: "1.25.8",
    releaseDate: "2026-10-25",
    mobileUrl: "/files/Adminuscurator-Retail-1.25.4.apk",
    mobileSize: "184 KB",
    tabletUrl: "/files/Adminuscurator-Retail-1.25.4.apk",
    tabletSize: "184 KB",
    // Desktop installers — built by .github/workflows/retail-desktop.yml
    windowsUrl: `${RETAIL_RELEASE}/AdminuscuratorRetail-Setup-1.25.8.exe`,
    windowsSize: "106 MB",
    macUrl: `${RETAIL_RELEASE}/AdminuscuratorRetail-1.25.8-mac.dmg`,
    macSize: "218 MB",
    license: "Free to download and use",
    isPlaceholder: false,
  },
  {
    id: "adminuscurator-services",
    name: "Adminuscurator Services",
    description:
      "Offline management and accounting for service businesses: a service price list, appointments/booking, recurring billing, GST invoices, credit, customers, expenses and reports. Works on Android, Windows and Mac — no internet or account needed.",
    logo: "/brand/app-icon.svg",
    icon: "fileText",
    version: "1.25.8",
    releaseDate: "2026-10-25",
    mobileUrl: "/files/Adminuscurator-Services-1.25.4.apk",
    mobileSize: "188 KB",
    tabletUrl: "/files/Adminuscurator-Services-1.25.4.apk",
    tabletSize: "188 KB",
    // Desktop installers — built by .github/workflows/services-desktop.yml
    windowsUrl: `${SERVICES_RELEASE}/AdminuscuratorServices-Setup-1.25.8.exe`,
    windowsSize: "106 MB",
    macUrl: `${SERVICES_RELEASE}/AdminuscuratorServices-1.25.8-mac.dmg`,
    macSize: "218 MB",
    license: "Free to download and use",
    isPlaceholder: false,
  },
];

export const defaultManagedContent: ManagedContent = {
  features: defaultFeatures,
  plans: defaultPlans,
  testimonials: defaultTestimonials,
  faqs: defaultFaqs,
  products: defaultProducts,
  software: defaultSoftware,
};
