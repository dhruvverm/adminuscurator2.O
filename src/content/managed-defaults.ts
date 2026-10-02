/**
 * Default values for content that administrators can also edit in /admin.
 * Once an admin saves changes, the saved version (in the data store)
 * takes precedence over these defaults.
 */
import type { Faq, Feature, ManagedContent, Plan, Product, Software, Testimonial } from "./types";

export const defaultFeatures: Feature[] = [
  {
    id: "dashboard",
    icon: "dashboard",
    title: "Smart Dashboard",
    description: "Get a clear overview of your most important information from one place.",
    href: "/features#dashboard",
  },
  {
    id: "automation",
    icon: "zap",
    title: "Automation",
    description: "Automate repetitive tasks and save valuable time.",
    href: "/features#automation",
  },
  {
    id: "analytics",
    icon: "barChart",
    title: "Analytics & Reports",
    description: "Turn your data into clear, actionable insights.",
    href: "/features#analytics",
  },
  {
    id: "collaboration",
    icon: "users",
    title: "Team Collaboration",
    description: "Keep your team aligned and productive.",
    href: "/features#collaboration",
  },
  {
    id: "security",
    icon: "shield",
    title: "Security",
    description: "Protect your business data with secure, reliable infrastructure.",
    href: "/features#security",
  },
  {
    id: "integrations",
    icon: "plug",
    title: "Integrations",
    description: "Connect your workflow with the tools you already use.",
    href: "/features#integrations",
  },
  {
    id: "notifications",
    icon: "bell",
    title: "Notifications",
    description: "Stay informed about important activities and updates.",
    href: "/features#notifications",
  },
  {
    id: "customization",
    icon: "sliders",
    title: "Customization",
    description: "Configure the software around your business needs.",
    href: "/features#customization",
  },
];

/** PLACEHOLDER pricing — no real prices have been provided yet. */
export const defaultPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For individuals and small teams.",
    priceMonthly: null,
    priceYearly: null,
    priceLabel: "$XX",
    currency: "USD",
    kind: "self-serve",
    cta: "Start Free",
    highlighted: false,
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For growing businesses.",
    priceMonthly: null,
    priceYearly: null,
    priceLabel: "$XX",
    currency: "USD",
    kind: "self-serve",
    cta: "Get Started",
    highlighted: true,
    badge: "Most Popular",
    features: ["Everything in Starter", "Feature 5", "Feature 6", "Feature 7", "Feature 8"],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For larger teams and organizations.",
    priceMonthly: null,
    priceYearly: null,
    priceLabel: "Let's Talk",
    currency: "USD",
    kind: "sales",
    cta: "Contact Sales",
    highlighted: false,
    features: [
      "Everything in Professional",
      "Advanced features",
      "Custom options",
      "Priority support",
      "Enterprise capabilities",
    ],
  },
];

/**
 * SAMPLE testimonials. These are NOT real customer reviews and are
 * labelled as samples on the site until replaced (set isPlaceholder: false
 * only for genuine, approved quotes).
 */
export const defaultTestimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "This software has completely changed how our team manages its daily workflow. We save hours every week.",
    name: "[Customer Name]",
    role: "[Job Title]",
    company: "[Company]",
    isPlaceholder: true,
  },
  {
    id: "t2",
    quote:
      "Everything we need is finally in one place. Onboarding the team took an afternoon, not a month.",
    name: "[Customer Name]",
    role: "[Job Title]",
    company: "[Company]",
    isPlaceholder: true,
  },
  {
    id: "t3",
    quote:
      "The reporting gives us the visibility we were missing. Decisions that used to take days now take minutes.",
    name: "[Customer Name]",
    role: "[Job Title]",
    company: "[Company]",
    isPlaceholder: true,
  },
];

export const defaultFaqs: Faq[] = [
  {
    id: "what",
    question: "What is this software?",
    answer:
      "It's an all-in-one platform that brings your dashboards, automation, analytics and team collaboration together so your business can run more smoothly. [Replace with a one-sentence description of your product.]",
  },
  {
    id: "who",
    question: "Who is it designed for?",
    answer:
      "Startups, small businesses, growing teams and larger organizations that want to reduce manual work and centralize their workflows. [Replace with your target customers.]",
  },
  {
    id: "how",
    question: "How does the software work?",
    answer:
      "Create an account, configure your workspace and workflows, invite your team, and start using automation and analytics from a single dashboard.",
  },
  {
    id: "trial",
    question: "Is there a free trial?",
    answer: "[Describe your trial or free plan here, e.g. length of trial and whether a card is required.]",
  },
  {
    id: "plans",
    question: "What plans are available?",
    answer:
      "We offer Starter, Professional and Business plans. See the pricing page for a full comparison of what each plan includes.",
  },
  {
    id: "cancel",
    question: "Can I cancel anytime?",
    answer: "[Describe your cancellation terms here.] See our Refund Policy for details.",
  },
  {
    id: "security",
    question: "Is my data secure?",
    answer:
      "Protecting your data is a priority. Visit the security section to learn how we safeguard your information. [Add specifics about your security practices.]",
  },
  {
    id: "integrations",
    question: "Can I integrate it with other tools?",
    answer:
      "Yes — the platform is designed to connect with the tools you already use. [List your supported integrations.]",
  },
  {
    id: "support",
    question: "Do you offer customer support?",
    answer: "Yes. You can reach our team through the contact page. [Add your support channels and hours.]",
  },
  {
    id: "custom",
    question: "Can I request a custom solution?",
    answer:
      "Absolutely. Contact our sales team to discuss your requirements and whether a custom setup is right for you.",
  },
];

export const defaultProducts: Product[] = [
  {
    id: "platform",
    name: "Adminuscurator Platform",
    summary: "The core workspace: dashboards, automation, analytics and collaboration. [Replace with your product.]",
    status: "active",
  },
];

/**
 * Downloadable apps (Downloads page). Put installer files in /public/files
 * and link them as "/files/…", or use store URLs. Leave a platform's URL
 * empty when it isn't available — that option is then disabled.
 */
const RELEASE = "https://github.com/dhruvverm/adminuscurator2.O/releases/download/adminuscurator-v1.25.0";
const RETAIL_RELEASE = "https://github.com/dhruvverm/adminuscurator2.O/releases/download/adminuscurator-retail-v1.25.0";
const SERVICES_RELEASE = "https://github.com/dhruvverm/adminuscurator2.O/releases/download/adminuscurator-services-v1.25.0";

export const defaultSoftware: Software[] = [
  {
    id: "adminuscurator-optical",
    name: "Adminuscurator Optical",
    description:
      "Offline management and accounting for optical shops: customers, prescriptions, stock, billing, credit, expenses and reports. Installs as an app on Android, Windows and Mac; no internet or account needed, and your data stays on your device.",
    logo: "/brand/app-icon.svg",
    icon: "eye",
    version: "1.25.0",
    releaseDate: "2026-09-18",
    // Android app (APK) for phones and tablets — served from this site
    mobileUrl: "/files/Adminuscurator-1.25.0-b5.apk",
    mobileSize: "177 KB",
    tabletUrl: "/files/Adminuscurator-1.25.0-b5.apk",
    tabletSize: "177 KB",
    // Desktop installers — built by .github/workflows/optical-shop-desktop.yml
    windowsUrl: `${RELEASE}/Adminuscurator-Setup-1.25.0.exe`,
    windowsSize: "106 MB",
    macUrl: `${RELEASE}/Adminuscurator-1.25.0-mac.dmg`,
    macSize: "218 MB",
    license: "Free to download and use",
    isPlaceholder: false,
  },
  {
    id: "adminuscurator-retail",
    name: "Adminuscurator Retail",
    description:
      "Offline management and accounting for clothing shops: products with size & colour variants, per-variant stock and low-stock alerts, GST billing, credit, customers, expenses and reports. Works on Android, Windows and Mac — no internet or account needed.",
    logo: "/brand/app-icon.svg",
    icon: "store",
    version: "1.25.0",
    releaseDate: "2026-09-30",
    mobileUrl: "/files/Adminuscurator-Retail-1.25.1.apk",
    mobileSize: "193 KB",
    tabletUrl: "/files/Adminuscurator-Retail-1.25.1.apk",
    tabletSize: "193 KB",
    // Desktop installers — built by .github/workflows/retail-desktop.yml
    windowsUrl: `${RETAIL_RELEASE}/AdminuscuratorRetail-Setup-1.25.0.exe`,
    windowsSize: "106 MB",
    macUrl: `${RETAIL_RELEASE}/AdminuscuratorRetail-1.25.0-mac.dmg`,
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
    version: "1.25.0",
    releaseDate: "2026-09-30",
    mobileUrl: "/files/Adminuscurator-Services-1.25.1.apk",
    mobileSize: "193 KB",
    tabletUrl: "/files/Adminuscurator-Services-1.25.1.apk",
    tabletSize: "193 KB",
    // Desktop installers — built by .github/workflows/services-desktop.yml
    windowsUrl: `${SERVICES_RELEASE}/AdminuscuratorServices-Setup-1.25.0.exe`,
    windowsSize: "106 MB",
    macUrl: `${SERVICES_RELEASE}/AdminuscuratorServices-1.25.0-mac.dmg`,
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
