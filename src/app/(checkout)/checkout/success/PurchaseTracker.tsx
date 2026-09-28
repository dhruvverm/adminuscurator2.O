"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires the purchase conversion once per order (per browser). */
export function PurchaseTracker({ orderId, plan, value, currency }: { orderId: string; plan: string; value: number | null; currency: string }) {
  useEffect(() => {
    const key = `tracked:${orderId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {}
    track("purchase", { transaction_id: orderId, plan, value: value ?? undefined, currency });
  }, [orderId, plan, value, currency]);
  return null;
}
