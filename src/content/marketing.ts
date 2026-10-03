/**
 * Marketing copy for the public website. Edit freely.
 * Values wrapped in [brackets] or flagged `placeholder: true`
 * are placeholders that must be replaced with real information.
 */
import type { IconName } from "@/components/ui/Icon";
import { routes } from "@/config/site";

export const hero = {
  badge: "Powerful Software. Built for Modern Businesses.",
  headline: "Everything You Need to Work Smarter, Faster, and Better.",
  /** Words of the headline to render with the brand gradient. */
  highlight: "Smarter, Faster,",
  subheadline:
    "Streamline your workflow, automate repetitive tasks, and manage your business with powerful software designed to help your team achieve more.",
  primaryCta: { label: "Get Started", href: routes.signup },
  secondaryCta: { label: "Explore Features", href: "#features" },
  trust: ["No complicated setup", "Easy to use", "Built for modern teams"],
};

/**
 * Trust indicators. PLACEHOLDERS — replace with your real numbers.
 * `value` is animated when it starts with a number.
 */
export const stats: { value: string; label: string; placeholder: boolean }[] = [
  { value: "10,000+", label: "Users", placeholder: true },
  { value: "99.9%", label: "Reliability", placeholder: true },
  { value: "24/7", label: "Support", placeholder: true },
  { value: "Secure", label: "& Reliable", placeholder: true },
  { value: "Easy", label: "Setup", placeholder: true },
];

/** Customer logos. Each entry links to the company's website. */
export const logoCloud = {
  heading: "Trusted by teams and businesses",
  placeholder: false,
  logos: [
    { name: "Vedera", href: "https://www.vedera.in/" },
    { name: "RatedR", href: "https://ratedr.in/" },
  ] as { name: string; href?: string }[],
};

export const problems: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "clock",
    title: "Too Much Manual Work",
    description: "Repetitive tasks consume valuable time that could be spent growing your business.",
  },
  {
    icon: "layers",
    title: "Scattered Information",
    description: "Important data and workflows are spread across different tools.",
  },
  {
    icon: "puzzle",
    title: "Difficult Processes",
    description: "Complicated systems slow your team down and make everyday work harder.",
  },
  {
    icon: "eyeOff",
    title: "Lack of Visibility",
    description: "Without clear insights, it's difficult to understand what's happening across your business.",
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
    tab: "Dashboard",
    icon: "dashboard",
    title: "See Everything at a Glance",
    description:
      "Monitor your most important metrics, tasks, activities, and performance from a single intuitive dashboard.",
    points: ["Customizable widgets", "Real-time activity feed", "Team and task overview"],
  },
  {
    key: "analytics",
    tab: "Analytics",
    icon: "chart",
    title: "Understand What's Working",
    description:
      "Explore trends, compare periods and drill into the numbers behind your results with clear, interactive charts.",
    points: ["Trend and comparison views", "Segment by team or source", "Goal tracking"],
  },
  {
    key: "automation",
    tab: "Automation",
    icon: "workflow",
    title: "Put Routine Work on Autopilot",
    description:
      "Build workflows with simple triggers and actions so repetitive tasks happen automatically — no code required.",
    points: ["Visual workflow builder", "Triggers, conditions and actions", "Run history and alerts"],
  },
  {
    key: "reports",
    tab: "Reports",
    icon: "fileText",
    title: "Share Clear, Ready-Made Reports",
    description:
      "Generate polished reports in a click, schedule them for stakeholders, and export in the formats you need.",
    points: ["Scheduled delivery", "Export to CSV and PDF", "Shareable links"],
  },
];

export const steps = [
  {
    title: "Create Your Account",
    description: "Sign up and set up your workspace in just a few minutes.",
    icon: "userCheck" as IconName,
  },
  {
    title: "Configure Your Workflow",
    description: "Customize the platform to match your business and team's needs.",
    icon: "sliders" as IconName,
  },
  {
    title: "Start Getting More Done",
    description: "Use automation, analytics, and powerful tools to simplify your work.",
    icon: "rocket" as IconName,
  },
];

export const benefits: { icon: IconName; title: string; description: string }[] = [
  { icon: "clock", title: "Save Time", description: "Spend less time on busywork and more on what matters." },
  { icon: "zap", title: "Reduce Manual Work", description: "Let automation handle the repetitive steps." },
  { icon: "trendingUp", title: "Improve Productivity", description: "Give every team member a clearer, faster way to work." },
  { icon: "target", title: "Make Better Decisions", description: "Act on up-to-date insights instead of guesswork." },
  { icon: "layers", title: "Centralize Your Workflow", description: "Replace scattered tools with one connected platform." },
  { icon: "rocket", title: "Scale More Easily", description: "Grow your team and processes without growing complexity." },
];

/** Generic security topics — add specific certifications ONLY if you hold them. */
export const security: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "lock",
    title: "Data Security",
    description: "Your data is protected in transit and at rest. [Describe your encryption practices.]",
  },
  {
    icon: "fingerprint",
    title: "Secure Authentication",
    description: "Hashed passwords, secure sessions and optional single sign-on. [Add MFA/SSO details.]",
  },
  {
    icon: "server",
    title: "Reliable Infrastructure",
    description: "Built on dependable cloud infrastructure. [Name your hosting provider and uptime commitments.]",
  },
  {
    icon: "refresh",
    title: "Regular Backups",
    description: "Your information is backed up on a regular schedule. [Describe backup frequency and retention.]",
  },
  {
    icon: "eye",
    title: "Privacy",
    description: "We never sell your data. Read our Privacy Policy to learn how it's handled.",
  },
  {
    icon: "key",
    title: "Access Controls",
    description: "Role-based permissions ensure people only see what they need to.",
  },
];

/** Use cases — edit to match your real target industries. */
export const useCases: { icon: IconName; title: string; description: string; points: string[] }[] = [
  {
    icon: "rocket",
    title: "For Startups",
    description: "Move quickly without building complicated internal systems.",
    points: ["Launch-ready in minutes", "Grows with you", "No IT team required"],
  },
  {
    icon: "store",
    title: "For Small Businesses",
    description: "Manage your operations more efficiently with fewer tools.",
    points: ["Replace multiple apps", "Simple, predictable pricing", "Easy for everyone"],
  },
  {
    icon: "users",
    title: "For Growing Teams",
    description: "Give your team a centralized platform for collaboration and productivity.",
    points: ["Shared workspaces", "Roles and permissions", "Team-wide visibility"],
  },
  {
    icon: "building",
    title: "For Enterprises",
    description: "Scale your workflows with advanced controls and customization.",
    points: ["Advanced controls", "Custom configuration", "Dedicated support options"],
  },
];

export const finalCta = {
  headline: "Ready to Work Smarter?",
  text: "Start using powerful software designed to simplify your workflow and help your business grow.",
  primary: { label: "Get Started", href: routes.signup },
  secondary: { label: "Talk to Sales", href: "/contact?subject=sales" },
};

export const about = {
  headline: "We build software that makes work simpler.",
  intro:
    "[Company Name] was founded to help businesses spend less time fighting their tools and more time doing their best work. [Replace with your company story.]",
  mission:
    "[Your mission statement — one or two sentences on why your company exists and who it serves.]",
  values: [
    { icon: "target" as IconName, title: "Customer First", description: "[Describe this value in one sentence.]" },
    { icon: "sparkles" as IconName, title: "Simplicity", description: "[Describe this value in one sentence.]" },
    { icon: "shield" as IconName, title: "Trust", description: "[Describe this value in one sentence.]" },
    { icon: "trendingUp" as IconName, title: "Continuous Improvement", description: "[Describe this value in one sentence.]" },
  ],
};
