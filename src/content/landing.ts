/**
 * Landing pages for the searches shop owners actually make
 * ("optical shop billing software", "clothing store billing software"…).
 * Each one is a real, specific page: what the edition does for that kind of shop,
 * who it is for, and answers to the questions people ask before buying.
 * Keep every claim true to the apps — these pages are what Google ranks.
 */
export interface LandingPage {
  slug: string;
  edition: string; // name of the app on the Downloads page
  metaTitle: string; // ~50–60 characters, " — Adminuscurator" is added
  metaDescription: string; // ~150–160 characters
  eyebrow: string;
  h1: string;
  lede: string;
  intro: string[];
  featuresTitle: string;
  features: { title: string; body: string }[];
  whoTitle: string;
  who: string[];
  whyTitle: string;
  why: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
}

const COMMON_FAQ = {
  devices: {
    question: "Which devices does it work on?",
    answer:
      "Android phones and tablets, Windows PCs and laptops, and Macs. Download the app for your device from the Downloads page — there is no website to log in to and no account to create.",
  },
  internet: {
    question: "Do I need internet to use it?",
    answer:
      "No. Billing, stock, customers, udhaar and reports all work fully offline. Your data is saved on your own phone or computer, so a slow or dead connection never stops a sale. Internet is only needed if you choose to send something on WhatsApp.",
  },
  price: {
    question: "How much does it cost?",
    answer:
      "You can start with a free trial. After that there are simple plans: ₹1,500 for 1 month, ₹8,000 for 6 months or ₹25,000 for lifetime use. Every plan includes every feature, and there is no monthly subscription that renews on its own.",
  },
  data: {
    question: "Is my shop data safe?",
    answer:
      "Your bills, customers and stock stay on your own device — nothing is uploaded to our servers. You can take a backup file at any time and restore it on a new phone or computer.",
  },
};

export const landingPages: LandingPage[] = [
  /* ───────────────────────── Optical ───────────────────────── */
  {
    slug: "optical-shop-billing-software",
    edition: "Adminuscurator Optical",
    metaTitle: "Optical Shop Billing Software with Prescriptions",
    metaDescription:
      "Optical shop billing software: eye prescriptions, frame & lens stock, spectacle orders with advance, udhaar, check-up reminders and reports. Works offline.",
    eyebrow: "Optical shop software",
    h1: "Optical Shop Billing Software That Remembers Every Prescription",
    lede:
      "Bill frames, lenses and contact lenses, save each customer's eye prescription, track spectacle orders and udhaar — all offline on your phone or computer.",
    intro: [
      "An optical shop is not like a general store. Every customer comes with a prescription, most spectacle orders are paid with an advance and collected days later, and regular customers expect you to remember their power. Notebooks and a general billing app can't keep all of that together.",
      "Adminuscurator Optical is built for exactly this. It keeps the customer, their prescriptions, their bills and their pending balance in one place, so the next time they walk in you can see their last power, what they bought and what they still owe in a few seconds.",
    ],
    featuresTitle: "Everything an optical shop needs",
    features: [
      { title: "Eye prescriptions on the customer", body: "Save SPH, CYL, axis, ADD, PD and vision for the right and left eye. Every prescription is kept with the date, so you can see how a customer's power has changed." },
      { title: "Spectacle orders with advance", body: "Put a job on the Order Forum when the customer pays an advance. The balance is tracked on that order, and when the customer pays later it is marked paid — even for walk-in customers." },
      { title: "Frame, lens and accessory stock", body: "Keep stock for frames, lenses, contact lenses, solutions and cases. Stock goes down with every bill and you see what is running low before it runs out." },
      { title: "Bills on paper or WhatsApp", body: "Print on a 58 mm or 80 mm thermal printer or A5 paper, save a PDF, or share the bill to the customer's WhatsApp in a tap." },
      { title: "Check-up and birthday reminders", body: "See which customers are due for their routine eye check-up and whose birthday is coming, so you can call or message them at the right time." },
      { title: "Udhaar, expenses and reports", body: "Track customer credit, record shop expenses and see daily, monthly and yearly sales, payments received and profit." },
    ],
    whoTitle: "Made for",
    who: ["Optical shops and opticians", "Eyewear showrooms", "Optometrists with a frame counter", "Contact lens and sunglass stores"],
    whyTitle: "Why opticians choose it",
    why: [
      "Works without internet — the counter never stops because the connection is down.",
      "No account and no cloud: prescriptions and customer details stay on your own device.",
      "One app on Android, Windows and Mac, with a free trial before you pay anything.",
      "Simple screens your staff can learn in minutes.",
    ],
    faqs: [
      { question: "Can I save a customer's eye prescription with their bill?", answer: "Yes. Each customer can have any number of prescriptions with right and left eye values (SPH, CYL, axis, ADD, PD, vision) and the date. You can pick a prescription when you make the bill so it prints with the order." },
      { question: "How are spectacle orders with an advance handled?", answer: "Tick “Save to Order Forum” on the bill and take the advance. The order shows the balance due. When the customer collects the glasses and pays the rest, use Receive payment on that order and it is marked paid." },
      COMMON_FAQ.internet,
      COMMON_FAQ.devices,
      COMMON_FAQ.price,
      COMMON_FAQ.data,
    ],
    related: ["offline-billing-software", "clothing-store-billing-software", "service-business-billing-software"],
  },

  /* ───────────────────────── Clothing / Retail ───────────────────────── */
  {
    slug: "clothing-store-billing-software",
    edition: "Adminuscurator Retail",
    metaTitle: "Clothing Shop Billing Software with Size & Colour",
    metaDescription:
      "Billing software for clothing & garment shops: stock for every size and colour, barcode billing, low-stock alerts, udhaar and reports. Works offline.",
    eyebrow: "Clothing & garment shop software",
    h1: "Billing Software for Clothing Stores — Stock for Every Size and Colour",
    lede:
      "Know exactly how many Medium Blue shirts are left. Bill by barcode or by search, track stock for each size and colour, and see what sells — even without internet.",
    intro: [
      "In a clothing shop one product is really many: the same shirt in four sizes and three colours is twelve different items on the shelf. Most simple billing apps count it as one, so you only find out a size is finished when a customer asks for it.",
      "Adminuscurator Retail keeps a separate stock for every size and colour of a product. Billing picks the exact size and colour sold, stock goes down for that one variant, and low-stock alerts tell you which sizes to reorder.",
    ],
    featuresTitle: "Built around sizes and colours",
    features: [
      { title: "Size & colour variants", body: "Add a product once with all its sizes and colours. Each variant has its own stock, code and barcode, and its own low-stock level." },
      { title: "Fast billing at the counter", body: "Scan a barcode or type a few letters of the name, choose the size and colour, and the bill is ready. Apply discounts on an item or the whole bill." },
      { title: "Stock received from suppliers", body: "Record purchases from your suppliers and stock is added to the right sizes and colours automatically." },
      { title: "Low-stock alerts", body: "See which sizes and colours are about to run out, so you reorder the ones that sell instead of guessing." },
      { title: "Customers and udhaar", body: "Keep customer details and their credit balance. Collect payments later and send the bill on WhatsApp." },
      { title: "Sales and profit reports", body: "Daily and monthly sales, product-wise sales, profit, expenses and stock value — so you know which items earn the most." },
    ],
    whoTitle: "Made for",
    who: ["Clothing and garment shops", "Boutiques and fashion stores", "Footwear shops", "Kids' wear and saree shops"],
    whyTitle: "Why shop owners choose it",
    why: [
      "Real per-size stock, not one number for the whole product.",
      "Keeps billing even when the internet is down.",
      "Your stock and customer data stay on your own device.",
      "Works on an Android phone, a Windows PC or a Mac — start with a free trial.",
    ],
    faqs: [
      { question: "Can I track stock separately for each size and colour?", answer: "Yes. Every product can have as many size and colour combinations as you need, and each one has its own stock, barcode and low-stock level. A bill reduces stock only for the size and colour sold." },
      { question: "Can I bill using a barcode scanner?", answer: "Yes. Give each size/colour its barcode and scan it at the counter, or search by name or code if an item has no barcode." },
      COMMON_FAQ.internet,
      COMMON_FAQ.devices,
      COMMON_FAQ.price,
      COMMON_FAQ.data,
    ],
    related: ["offline-billing-software", "restaurant-pos-software", "optical-shop-billing-software"],
  },

  /* ───────────────────────── Restaurant / POS ───────────────────────── */
  {
    slug: "restaurant-pos-software",
    edition: "Adminuscurator POS",
    metaTitle: "Restaurant POS Software with Table Billing",
    metaDescription:
      "Offline POS for restaurants and cafés: a separate order for every table, tap-or-scan billing, Excel menu upload, WhatsApp bills and a Swiggy/Zomato inbox.",
    eyebrow: "Restaurant & counter POS",
    h1: "Restaurant POS Software with a Separate Order for Every Table",
    lede:
      "Run every table's order at once, bill in a few taps and keep selling when the internet goes down. Built for restaurants, cafés, sweet shops and any busy counter.",
    intro: [
      "At a busy restaurant one person cannot remember which table ordered what, which one asked for the bill and which one is still waiting. Mistakes on the bill cost money and upset customers.",
      "Adminuscurator POS keeps a running order for each table. Add items as they are ordered, see every table's total at a glance, and turn an order into a bill when the guests are ready — on a phone, tablet or computer, with or without internet.",
    ],
    featuresTitle: "Everything a fast counter needs",
    features: [
      { title: "Tables mode", body: "Each table has its own running order. Add or change items any time and see which tables are occupied and what each one owes." },
      { title: "Tap or scan to bill", body: "Large, simple buttons for your menu or products, or scan a barcode. Take cash, UPI or card and print or share the bill in seconds." },
      { title: "Upload your menu from Excel", body: "Bring in your whole menu or inventory from an Excel (.xlsx) or CSV file instead of typing every item." },
      { title: "WhatsApp bills and campaigns", body: "Share any bill on WhatsApp. With your own WhatsApp Business API connected, bills can be sent automatically and you can send offers to your customers." },
      { title: "Swiggy and Zomato inbox", body: "An optional orders inbox that keeps online orders next to your dine-in bills, tagged by channel." },
      { title: "Daily sales and reports", body: "Today's sales, payments by method, expenses and profit — clear numbers at closing time." },
    ],
    whoTitle: "Made for",
    who: ["Restaurants and dhabas", "Cafés and bakeries", "Sweet shops and food stalls", "Any shop with a busy billing counter"],
    whyTitle: "Why owners choose it",
    why: [
      "Keeps billing through internet cuts — no lost orders at peak time.",
      "No monthly subscription that renews on its own.",
      "Works on the Android tablet or PC you already have.",
      "Free trial, so you can try it with your real menu first.",
    ],
    faqs: [
      { question: "Can I keep separate orders for different tables?", answer: "Yes. Turn on tables mode and every table holds its own order. You can keep adding items to a table and bill it when the guests are ready." },
      { question: "Can I import my menu instead of typing it?", answer: "Yes. Download the template, fill in your items and prices in Excel, and upload the .xlsx or CSV file to add everything at once." },
      { question: "Does it work with Swiggy and Zomato?", answer: "The POS edition has an optional orders inbox that shows Swiggy and Zomato orders alongside your counter bills, tagged by channel." },
      COMMON_FAQ.internet,
      COMMON_FAQ.devices,
      COMMON_FAQ.price,
    ],
    related: ["offline-billing-software", "clothing-store-billing-software", "service-business-billing-software"],
  },

  /* ───────────────────────── Services ───────────────────────── */
  {
    slug: "service-business-billing-software",
    edition: "Adminuscurator Services",
    metaTitle: "Billing Software for Gyms, Salons & Services",
    metaDescription:
      "Billing for gyms, salons, clinics and repair shops: monthly membership bills, appointments, a service price list, dues list and WhatsApp receipts. Works offline.",
    eyebrow: "Gym, salon & service business software",
    h1: "Billing Software for Gyms, Salons and Service Businesses",
    lede:
      "Bill monthly memberships in one tap, book appointments, keep a service price list and always know who still has to pay — offline, on your phone or computer.",
    intro: [
      "A service business doesn't sell boxes off a shelf. A gym collects fees every month from dozens of members, a salon books appointments, a repair shop bills for labour and parts. Keeping that in a register means missed renewals and forgotten dues.",
      "Adminuscurator Services is built for this. Set up a recurring bill once for each member or client, and every month the bills due are ready to generate in a tap. Appointments, a service price list and a clear list of who owes what sit in the same app.",
    ],
    featuresTitle: "Made for businesses that sell services",
    features: [
      { title: "Recurring monthly bills", body: "Create a recurring bill for each member — every month, every 3 months or every week. When bills are due, generate them all in one tap." },
      { title: "Appointments", body: "Book appointments and see the day's schedule, so clients aren't double-booked and no one is forgotten." },
      { title: "Service price list", body: "Keep your services and packages with their prices and bill them quickly, along with any products you sell." },
      { title: "Who still has to pay", body: "Every client's balance is tracked. See the full list of dues and collect payments later against the right bill." },
      { title: "Receipts on WhatsApp", body: "Print a receipt or share it to the client's WhatsApp in a tap." },
      { title: "Expenses and reports", body: "Record rent, salaries and other expenses and see monthly income, collections and profit." },
    ],
    whoTitle: "Made for",
    who: ["Gyms and fitness studios", "Salons, spas and parlours", "Clinics and coaching classes", "Repair and service centres"],
    whyTitle: "Why owners choose it",
    why: [
      "No more missed monthly fees — recurring bills are ready when they are due.",
      "Works offline, so the front desk never stops.",
      "Client data stays on your own device.",
      "Runs on Android, Windows and Mac — try it free first.",
    ],
    faqs: [
      { question: "Can it bill gym members every month automatically?", answer: "Set up a recurring bill once for each member with their plan and amount. When the bills are due, the app shows them and you generate them all with one tap — then share the receipts on WhatsApp." },
      { question: "Can I see which members haven't paid?", answer: "Yes. Every member's balance is tracked and the dues list shows who still has to pay and how much." },
      COMMON_FAQ.internet,
      COMMON_FAQ.devices,
      COMMON_FAQ.price,
      COMMON_FAQ.data,
    ],
    related: ["offline-billing-software", "optical-shop-billing-software", "restaurant-pos-software"],
  },

  /* ───────────────────────── Offline billing (pillar) ───────────────────────── */
  {
    slug: "offline-billing-software",
    edition: "Adminuscurator",
    metaTitle: "Offline Billing Software for PC, Android & Mac",
    metaDescription:
      "Billing and inventory software that works without internet on Windows, Android and Mac. Your bills, stock and udhaar stay on your device. Free trial.",
    eyebrow: "Offline billing software",
    h1: "Offline Billing Software That Works Without Internet",
    lede:
      "Make bills, manage stock and track udhaar on your own computer or phone — no internet, no account and no cloud. Your shop keeps running even when the network doesn't.",
    intro: [
      "Most billing software today lives on the internet. When the connection drops, billing stops, and every month a subscription fee is charged whether the shop had a good month or not. Your customer list and sales also sit on someone else's server.",
      "Adminuscurator works the other way. The app is installed on your own Windows PC, Mac or Android device and everything — bills, products, customers, udhaar and reports — is saved right there. It works the same with or without internet, and you can take a backup file whenever you like.",
    ],
    featuresTitle: "Everything works offline",
    features: [
      { title: "Billing", body: "Quick bills with discounts, multiple payment methods and part payments. Print on thermal or A5 printers, save a PDF or share on WhatsApp." },
      { title: "Inventory", body: "Stock goes down with every sale and up with every purchase. Low-stock alerts tell you what to reorder." },
      { title: "Customers and udhaar", body: "Every customer's purchases and pending balance in one place. Record payments as they come in." },
      { title: "Expenses", body: "Note rent, salaries, electricity and other expenses so your profit figures are real." },
      { title: "Reports", body: "Daily, monthly and yearly sales, product-wise sales, payments received, expenses and profit. Export to CSV." },
      { title: "Backup and restore", body: "Save a backup file to your phone, computer or a pen drive and restore it on a new device whenever you need." },
    ],
    whoTitle: "Choose your edition",
    who: ["POS — any shop, restaurant or counter", "Optical — prescriptions and spectacle orders", "Retail — clothing with size & colour stock", "Services — gyms, salons and appointments"],
    whyTitle: "Why offline is better for a shop",
    why: [
      "No lost sales when the internet is slow or down.",
      "No subscription that renews every month on its own.",
      "Your data stays on your device, not on a cloud server.",
      "Fast — nothing waits for a server to reply.",
    ],
    faqs: [
      { question: "Is there billing software that works without internet?", answer: "Yes. Adminuscurator is installed on your Windows PC, Mac or Android device and works completely offline — billing, stock, customers, udhaar and reports all run without any connection." },
      { question: "Where is my data stored?", answer: "On your own device. Nothing is uploaded to our servers. Take a backup file whenever you want and keep it on another device or a pen drive." },
      COMMON_FAQ.devices,
      COMMON_FAQ.price,
      { question: "Which edition should I choose?", answer: "POS for any shop, restaurant or counter; Optical for optical shops; Retail for clothing and shops that need size and colour stock; Services for gyms, salons and service businesses. Each one works offline on all three platforms." },
    ],
    related: ["optical-shop-billing-software", "clothing-store-billing-software", "restaurant-pos-software", "service-business-billing-software"],
  },
];

export const landingBySlug = (slug: string) => landingPages.find((p) => p.slug === slug);
