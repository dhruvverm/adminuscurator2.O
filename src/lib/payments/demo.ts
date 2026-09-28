import type { PaymentProvider } from "./index";

/**
 * Demo provider for local development: no payment is taken and no card
 * details are requested. Disabled automatically in production.
 */
export const demoProvider: PaymentProvider = {
  id: "demo",
  label: "Demo checkout (no payment taken)",
  async createCheckout({ order, successUrl }) {
    return { redirectUrl: successUrl.replace("{ORDER_ID}", order.id) + "&demo=1" };
  },
  async confirm() {
    return true;
  },
};
