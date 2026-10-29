/**
 * Marketing copy for the public website — real content for Adminuscurator,
 * offline shop-management software (Optical, Retail, Services, POS).
 */
import type { IconName } from "@/components/ui/Icon";

export const hero = {
  badge: "Offline software for everyday shops",
  headline: "Run your whole shop — offline, free, and yours.",
  /** Words of the headline to render with the brand gradient. */
  highlight: "offline, free,",
  subheadline:
    "Billing, stock, customers, credit (udhaar), expenses and reports for optical, retail, service and point-of-sale shops. Works fully offline on Android, Windows and Mac — no account, no monthly fees, and your data stays on your device.",
  primaryCta: { label: "Download free", href: "/downloads" },
  secondaryCta: { label: "See features", href: "#features" },
  trust: ["100% offline", "No account needed", "Free to start"],
};

/** Honest, verifiable facts — no invented numbers. */
export const stats: { value: string; label: string; placeholder: boolean }[] = [
  { value: "4", label: "Shop editions", placeholder: false },
  { value: "100%", label: "Offline", placeholder: false },
  { value: "Free", label: "to start", placeholder: false },
  { value: "3", label: "Platforms", placeholder: false },
];

/** Customer logos. Each entry links to the company's website. */
export const logoCloud = {
  heading: "Built for real shops and counters",
  placeholder: false,
  logos: [
    { name: "Vedera", href: "https://www.vedera.in/" },
    { name: "RatedR", href: "https://ratedr.in/" },
  ] as { name: string; href?: string }[],
};

export const problems: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "clock",
    title: "Billing by hand is slow",
    description: "Writing bills on paper or punching a calculator wastes time at a busy counter and leads to mistakes.",
  },
  {
    icon: "layers",
    title: "Stock you can't keep track of",
    description: "You often find out an item is finished only when a customer asks for it — and a sale walks away.",
  },
  {
    icon: "puzzle",
    title: "Udhaar that gets forgotten",
    description: "Credit given to customers slips through the cracks on loose paper, and so does the money.",
  },
  {
    icon: "eyeOff",
    title: "Cloud tools cost money and need internet",
    description: "Most billing software charges every month and simply stops working the moment your connection drops.",
  },
];

export type ShowcaseKey = "dashboard" | "analytics" | "automation" | "reports";

export const showcase: {
  key: ShowcaseKey;
  tab: string;
  icon: IconName;
  title: string;
  description: string;
  points: string[];
  /** Optional real screenshot in /public. When empty, a built-in UI mockup is shown. */
  image?: string;
}[] = [
  {
    key: "dashboard",
    tab: "Billing",
    icon: "dashboard",
    title: "Bill a customer in seconds",
    description:
      "Add items to a bill, take the payment, and print to a thermal (58/80 mm) or A5 printer — or share the invoice straight to WhatsApp.",
    points: ["Fast counter billing", "Thermal & A5 printing", "Share bills on WhatsApp"],
  },
  {
    key: "automation",
    tab: "Stock",
    icon: "layers",
    title: "Always know your stock",
    description:
      "Manage products and quantities with low-stock alerts so you reorder before you run out. Bulk-import your inventory from Excel or CSV.",
    points: ["Low-stock alerts", "Excel / CSV bulk import", "Per-variant stock (size & colour)"],
  },
  {
    key: "analytics",
    tab: "Customers & Udhaar",
    icon: "users",
    title: "Track customers and credit",
    description:
      "Keep a record of every customer and the credit (udhaar) they owe, so you always know who owes what — and get it back.",
    points: ["Customer history", "Udhaar / credit tracking", "Payment reminders"],
  },
  {
    key: "reports",
    tab: "Reports",
    icon: "chart",
    title: "See your real numbers",
    description:
      "Daily sales, collections, expenses and profit — clear reports with no spreadsheets, and a one-tap backup to keep your data safe.",
    points: ["Daily sales & profit", "Expense tracking", "Backup & restore"],
  },
];

export const steps = [
  {
    title: "Download the app",
    description: "Get the free app for Android, Windows or Mac — no account and no sign-up needed.",
    icon: "download" as IconName,
  },
  {
    title: "Add your products",
    description: "Add your items and prices once, or bulk-import your whole inventory from an Excel or CSV file.",
    icon: "sliders" as IconName,
  },
  {
    title: "Start billing",
    description: "Make bills, track stock and udhaar, and see your daily reports from day one — all offline.",
    icon: "rocket" as IconName,
  },
];

export const benefits: { icon: IconName; title: string; description: string }[] = [
  { icon: "clock", title: "Save time at the counter", description: "Bill, print and share faster than pen and paper." },
  { icon: "shield", title: "Works 100% offline", description: "Keep selling even when the internet is down." },
  { icon: "lock", title: "Your data stays on your device", description: "No cloud, no uploads — your business data is yours alone." },
  { icon: "trendingUp", title: "Know your profit", description: "Clear daily sales, expenses and profit reports." },
  { icon: "layers", title: "Everything in one app", description: "Billing, stock, customers, udhaar, expenses and reports together." },
  { icon: "rocket", title: "Free to start, no subscriptions", description: "A genuine free trial and simple one-time pricing — no monthly fees." },
];

/** How the offline model keeps your data safe — all accurate for Adminuscurator. */
export const security: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "lock",
    title: "Your data stays on your device",
    description: "Nothing is uploaded to a server. Your customers, bills and stock live only on your own phone or computer.",
  },
  {
    icon: "shield",
    title: "No account, no sign-up",
    description: "There's no online account or cloud database to be breached — because there isn't one.",
  },
  {
    icon: "refresh",
    title: "Backup & restore",
    description: "Save a backup file any time and restore it when you change or reset your device.",
  },
  {
    icon: "eye",
    title: "We never see or sell your data",
    description: "Since your data never leaves your device, we have no access to it — and nothing to sell.",
  },
  {
    icon: "key",
    title: "Works offline, always",
    description: "No internet dependency. Only optional extras like WhatsApp bills use a connection.",
  },
  {
    icon: "fingerprint",
    title: "Simple offline activation",
    description: "A one-time activation code unlocks the app — no personal details required to use it.",
  },
];

/** The four editions — one for each kind of shop. */
export const useCases: { icon: IconName; title: string; description: string; points: string[] }[] = [
  {
    icon: "eye",
    title: "For Optical Shops",
    description: "Manage prescriptions, frames and lens stock, billing, credit and customer records.",
    points: ["Prescription records", "Frame & lens stock", "Customer & udhaar tracking"],
  },
  {
    icon: "store",
    title: "For Retail & Clothing",
    description: "Handle products with size and colour variants, per-variant stock, billing and customers.",
    points: ["Size & colour variants", "Low-stock alerts", "Billing & credit"],
  },
  {
    icon: "fileText",
    title: "For Service Businesses",
    description: "Keep a service price list, appointments, recurring billing and clean invoices.",
    points: ["Service price list", "Appointments & reminders", "Recurring billing"],
  },
  {
    icon: "dashboard",
    title: "For Any Counter (POS)",
    description: "A fast tap-or-scan point of sale with Excel import and optional WhatsApp bills and campaigns.",
    points: ["Tap or scan to bill", "Excel / CSV import", "Optional WhatsApp bills"],
  },
];

export const finalCta = {
  headline: "Run your shop the simple way.",
  text: "Download Adminuscurator free and start billing in minutes — offline, on any device, with your data in your hands.",
  primary: { label: "Download free", href: "/downloads" },
  secondary: { label: "Contact us", href: "/contact" },
};

export const about = {
  headline: "We build simple, offline software for everyday shops.",
  intro:
    "Adminuscurator builds simple, offline software for the shops that keep neighbourhoods running — optical stores, clothing shops, service businesses and busy counters. We believe a shopkeeper shouldn't need fast internet, a monthly subscription, or a technical background to bill a customer, track stock, or know their profit. So we built billing, inventory, customers, credit and reports into apps that run entirely on your own phone or computer — no account, no cloud, no fees.",
  mission:
    "To give every small shop powerful, offline tools that are free to start and keep their data firmly in their own hands.",
  values: [
    { icon: "shield" as IconName, title: "Offline-first", description: "Your shop keeps running with or without the internet." },
    { icon: "lock" as IconName, title: "Your data is yours", description: "Everything stays on your device — we never upload or sell it." },
    { icon: "sparkles" as IconName, title: "Simple by design", description: "If a shopkeeper can't use it in minutes, it's too complicated." },
    { icon: "trendingUp" as IconName, title: "Fair and free to start", description: "A genuine free trial and one-time pricing — no subscriptions or lock-in." },
  ],
};
