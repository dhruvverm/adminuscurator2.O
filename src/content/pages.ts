/**
 * Legal pages and secondary resource pages.
 *
 * ⚠️ LEGAL TEXT BELOW IS PLACEHOLDER CONTENT ONLY. It is not legal advice
 * and must be replaced with policies reviewed by your legal counsel.
 */

export interface SimplePage {
  slug: string;
  title: string;
  description: string;
  updated?: string;
  sections: { heading: string; body: string[] }[];
}

const placeholderNotice =
  "This page contains placeholder text. Replace it with your company's actual policy, reviewed by a qualified legal professional, before launch.";

export const legalPages: SimplePage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How we collect, use and protect your personal information.",
    updated: "[Date]",
    sections: [
      { heading: "Placeholder notice", body: [placeholderNotice] },
      {
        heading: "1. Information we collect",
        body: [
          "[Describe the personal information you collect — for example account details, billing information handled by your payment provider, contact form submissions, and usage data.]",
        ],
      },
      {
        heading: "2. How we use information",
        body: ["[Explain the purposes for which information is used and the legal bases for processing.]"],
      },
      {
        heading: "3. Cookies and analytics",
        body: [
          "[Explain which cookies you use. Analytics and marketing cookies are only set after the visitor gives consent.] See our Cookie Policy.",
        ],
      },
      {
        heading: "4. Sharing and processors",
        body: ["[List the categories of third parties you share data with, such as hosting, payment and email providers.]"],
      },
      { heading: "5. Data retention", body: ["[State how long you keep each category of data.]"] },
      {
        heading: "6. Your rights",
        body: ["[Describe access, correction, deletion and other rights, and how to exercise them.]"],
      },
      { heading: "7. Contact", body: ["[Provide the contact details for privacy requests.]"] },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    description: "The terms that govern use of our software and website.",
    updated: "[Date]",
    sections: [
      { heading: "Placeholder notice", body: [placeholderNotice] },
      { heading: "1. Acceptance of terms", body: ["[Describe how the terms are accepted and who they apply to.]"] },
      { heading: "2. Accounts", body: ["[Account responsibilities, eligibility and security obligations.]"] },
      { heading: "3. Subscriptions and billing", body: ["[Billing cycles, renewals, price changes and taxes.]"] },
      { heading: "4. Acceptable use", body: ["[What users may and may not do with the service.]"] },
      { heading: "5. Intellectual property", body: ["[Ownership of the software and of customer data.]"] },
      { heading: "6. Limitation of liability", body: ["[Liability limitations as advised by counsel.]"] },
      { heading: "7. Termination", body: ["[How either party can end the agreement.]"] },
      { heading: "8. Governing law", body: ["[Jurisdiction and governing law.]"] },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    description: "Which cookies we use and how you can control them.",
    updated: "[Date]",
    sections: [
      { heading: "Placeholder notice", body: [placeholderNotice] },
      {
        heading: "Essential cookies",
        body: [
          "Required for the site to work, such as keeping you signed in and remembering your cookie choice. These cannot be switched off.",
        ],
      },
      {
        heading: "Analytics & marketing cookies",
        body: [
          "Only set if you choose “Accept” in the cookie banner. [List the providers you use, e.g. Google Analytics, Google Tag Manager, Meta Pixel.]",
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
    description: "Our policy on cancellations and refunds.",
    updated: "[Date]",
    sections: [
      { heading: "Placeholder notice", body: [placeholderNotice] },
      { heading: "Cancellations", body: ["[Explain how and when customers can cancel their subscription.]"] },
      { heading: "Refund eligibility", body: ["[Explain when refunds are or are not available.]"] },
      { heading: "How to request a refund", body: ["[Explain the process and expected timelines.]"] },
    ],
  },
];

export const resourcePages: SimplePage[] = [
  {
    slug: "integrations",
    title: "Integrations",
    description: "Connect Adminuscurator with the tools your team already uses.",
    sections: [{ heading: "Coming soon", body: ["[List your supported integrations here.]"] }],
  },
  {
    slug: "updates",
    title: "Product Updates",
    description: "New features, improvements and fixes.",
    sections: [{ heading: "Changelog", body: ["[Publish your release notes here.]"] }],
  },
  {
    slug: "careers",
    title: "Careers",
    description: "Help us build software that makes work simpler.",
    sections: [{ heading: "Open roles", body: ["[List open positions or link to your careers portal.]"] }],
  },
  {
    slug: "documentation",
    title: "Documentation",
    description: "Guides and references for getting the most out of the platform.",
    sections: [{ heading: "Getting started", body: ["[Link to or embed your product documentation.]"] }],
  },
  {
    slug: "blog",
    title: "Blog",
    description: "Ideas, guides and news from our team.",
    sections: [{ heading: "Latest posts", body: ["[Connect your blog or CMS here.]"] }],
  },
  {
    slug: "help-center",
    title: "Help Center",
    description: "Answers and support for common questions.",
    sections: [
      {
        heading: "How can we help?",
        body: ["Browse the FAQ or contact our support team. [Link to your help center or support portal.]"],
      },
    ],
  },
];
