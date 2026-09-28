import { markOrderPaid, setOrderStatus } from "@/lib/store";
import { verifyStripeSignature } from "@/lib/payments/stripe";

/**
 * Stripe webhook — the source of truth for payment status.
 * Point your Stripe dashboard webhook at /api/webhooks/stripe and
 * subscribe to: checkout.session.completed, checkout.session.expired.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("Webhook secret not configured", { status: 501 });

  const payload = await request.text();
  if (!verifyStripeSignature(payload, request.headers.get("stripe-signature"), secret)) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(payload) as { type: string; data: { object: { id: string; client_reference_id?: string; payment_status?: string } } };
  const session = event.data.object;
  const orderId = session.client_reference_id;

  if (orderId) {
    if (event.type === "checkout.session.completed" && session.payment_status === "paid") {
      await markOrderPaid(orderId, session.id);
    } else if (event.type === "checkout.session.expired") {
      await setOrderStatus(orderId, "cancelled");
    }
  }
  return Response.json({ received: true });
}
