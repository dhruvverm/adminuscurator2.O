/**
 * Legal pages and secondary resource pages.
 *
 * These describe how Adminuscurator actually works (offline apps, no accounts,
 * data on the user's own device). They are a plain-language summary, not formal
 * legal advice.
 */

export interface SimplePage {
  slug: string;
  title: string;
  description: string;
  updated?: string;
  sections: { heading: string; body: string[] }[];
}

const UPDATED = "October 2026";
const SUPPORT = "adminuscurator@gmail.com";
const WHATSAPP = "+91 82876 14772";

export const legalPages: SimplePage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How Adminuscurator handles your information — short version: your business data never leaves your device.",
    updated: UPDATED,
    sections: [
      {
        heading: "The short version",
        body: [
          "Adminuscurator's apps run fully offline. Everything you enter — customers, bills, stock, payments — is stored only on your own phone or computer. We have no servers that hold your business data, and we cannot see it.",
        ],
      },
      {
        heading: "Information we collect",
        body: [
          "In the apps: none. Your data stays on your device and is never uploaded to us.",
          `On this website: if you contact us through the form, by email, or on WhatsApp, we receive what you send us — such as your name, email or phone number — so we can reply. The site may use basic, privacy-friendly analytics to count visits. We do not run advertising trackers, and we never sell your data.`,
        ],
      },
      {
        heading: "How we use information",
        body: ["Only to answer your messages and to improve the website and apps. Nothing more."],
      },
      {
        heading: "Sharing",
        body: [
          "We do not share your information with advertisers or data brokers. If you message us on WhatsApp, that conversation is handled by WhatsApp under its own privacy terms.",
        ],
      },
      {
        heading: "Your rights",
        body: [`You can ask us to show or delete any message you have sent us. Email ${SUPPORT} and we will take care of it.`],
      },
      { heading: "Contact", body: [`Questions about privacy? Email ${SUPPORT} or message ${WHATSAPP} on WhatsApp.`] },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    description: "The terms for using the Adminuscurator apps and this website.",
    updated: UPDATED,
    sections: [
      {
        heading: "Using the apps",
        body: [
          "The Adminuscurator apps are free to download for Android, Windows and Mac. Each app includes a 15-day free trial; to keep using it after that, you activate it with a code. Lifetime codes do not expire.",
        ],
      },
      {
        heading: "Your data and backups",
        body: [
          "Your business data is stored only on your device and belongs entirely to you. Because it is not held on our servers, you are responsible for keeping backups. Each app has a built-in Backup & Restore — please use it regularly, especially before changing or resetting a device.",
        ],
      },
      {
        heading: "Activation codes",
        body: [
          "Activation codes are issued per device and are for your own business use. Please do not resell, share, copy or tamper with the software or its activation.",
        ],
      },
      {
        heading: "The software is provided “as is”",
        body: [
          "We work hard to keep the apps reliable, but we provide them as is. We are not liable for data lost through device failure, theft, deletion or reset — keeping your own backups protects you from this.",
        ],
      },
      { heading: "Changes", body: ["We may update these terms as the product grows. The date above shows the last update."] },
      { heading: "Governing law", body: ["These terms are governed by the laws of India."] },
      { heading: "Contact", body: [`Questions? Email ${SUPPORT} or message ${WHATSAPP} on WhatsApp.`] },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    description: "Which cookies this website uses.",
    updated: UPDATED,
    sections: [
      {
        heading: "Essential cookies only",
        body: [
          "This website uses only the essential storage it needs to work — for example remembering your cookie choice. We do not use advertising cookies, and the apps do not use cookies at all.",
        ],
      },
      {
        heading: "Changing your choice",
        body: ["You can change your preference at any time using the “Cookie settings” link in the site footer."],
      },
    ],
  },
  {
    slug: "refund",
    title: "Refund Policy",
    description: "Try before you pay, and how refunds work.",
    updated: UPDATED,
    sections: [
      {
        heading: "Try it free first",
        body: [
          "Every app is free to download and includes a 15-day free trial with all features unlocked, so you can test everything on your own shop before paying anything.",
        ],
      },
      {
        heading: "Activation codes",
        body: [
          "Activation codes are digital products delivered instantly, so they are generally non-refundable once issued. Please use the free trial to make sure the app suits your shop before buying a code.",
        ],
      },
      {
        heading: "If something isn’t right",
        body: [`If an app isn’t working for you, message us on WhatsApp ${WHATSAPP} or email ${SUPPORT}. We’ll help you fix it, and if we can’t, we’ll make it right.`],
      },
    ],
  },
];

export const resourcePages: SimplePage[] = [
  {
    slug: "integrations",
    title: "Integrations",
    description: "The everyday tools Adminuscurator works with.",
    sections: [
      {
        heading: "Works with what you already use",
        body: [
          "WhatsApp — share bills and reminders to customers in one tap.",
          "Excel & CSV — bulk-import your products and customers, and export your reports.",
          "Thermal (58/80 mm) and A5 printers — print bills directly.",
          "POS edition only: an optional Swiggy / Zomato order inbox, tagged by channel.",
        ],
      },
    ],
  },
  {
    slug: "updates",
    title: "Product Updates",
    description: "New features, improvements and fixes.",
    sections: [
      {
        heading: "Always improving",
        body: [
          "We ship improvements and fixes regularly, and updates are free. The latest version of each app is always on the Downloads page — just download it again to update.",
        ],
      },
    ],
  },
  {
    slug: "careers",
    title: "Careers",
    description: "Help us build simple software for shops.",
    sections: [
      {
        heading: "Say hello",
        body: [`We’re a small team building offline software for everyday shops. If you’d like to help, write to us at ${SUPPORT}.`],
      },
    ],
  },
  {
    slug: "documentation",
    title: "Documentation",
    description: "Getting started with Adminuscurator.",
    sections: [
      {
        heading: "Getting started",
        body: [
          "Download the app for your device, add your products (or import them from Excel/CSV), and start billing — no account or setup needed.",
          `For anything specific, check the FAQ or message us on WhatsApp ${WHATSAPP}.`,
        ],
      },
    ],
  },
  {
    slug: "blog",
    title: "Blog",
    description: "Tips for running your shop.",
    sections: [
      {
        heading: "Coming soon",
        body: ["We’re putting together simple guides on billing, stock and udhaar for small shops. Check back soon."],
      },
    ],
  },
  {
    slug: "help-center",
    title: "Help Center",
    description: "Answers and support.",
    sections: [
      {
        heading: "How can we help?",
        body: [`Browse the FAQ for quick answers, or reach us directly — WhatsApp ${WHATSAPP} or email ${SUPPORT}. We reply within one business day.`],
      },
    ],
  },
];
