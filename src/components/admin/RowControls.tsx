"use client";

import { useTransition } from "react";
import { updateMessageStatus, updateOrderStatus, updateUserRole } from "@/app/actions/admin";
import type { OrderStatus, Role } from "@/lib/store";

function useAction() {
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<void>) =>
    start(async () => {
      try {
        await fn();
      } catch (e) {
        alert((e as Error).message || "Something went wrong.");
      }
    });
  return { pending, run };
}

export function RoleSelect({ userId, role, disabled }: { userId: string; role: Role; disabled?: boolean }) {
  const { pending, run } = useAction();
  return (
    <select
      className="select"
      style={{ height: 36, fontSize: "0.875rem", width: 140 }}
      defaultValue={role}
      disabled={disabled || pending}
      aria-label="Role"
      onChange={(e) => {
        const next = e.target.value as Role;
        if (!confirm(`Change this user's role to “${next}”? They will need to sign in again.`)) {
          e.target.value = role;
          return;
        }
        run(() => updateUserRole(userId, next));
      }}
    >
      <option value="customer">Customer</option>
      <option value="editor">Editor</option>
      <option value="admin">Admin</option>
    </select>
  );
}

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const { pending, run } = useAction();
  return (
    <select
      className="select"
      style={{ height: 36, fontSize: "0.875rem", width: 130 }}
      defaultValue={status}
      disabled={pending}
      aria-label="Order status"
      onChange={(e) => run(() => updateOrderStatus(orderId, e.target.value as OrderStatus))}
    >
      <option value="pending">Pending</option>
      <option value="paid">Paid</option>
      <option value="failed">Failed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}

export function MessageActions({ id, status }: { id: string; status: "new" | "read" | "archived" }) {
  const { pending, run } = useAction();
  return (
    <div className="btn-row" style={{ gap: 6 }}>
      {status !== "read" && (
        <button className="btn btn--secondary btn--sm" disabled={pending} onClick={() => run(() => updateMessageStatus(id, "read"))}>
          Mark read
        </button>
      )}
      {status !== "archived" ? (
        <button className="btn btn--ghost btn--sm" disabled={pending} onClick={() => run(() => updateMessageStatus(id, "archived"))}>
          Archive
        </button>
      ) : (
        <button className="btn btn--ghost btn--sm" disabled={pending} onClick={() => run(() => updateMessageStatus(id, "new"))}>
          Restore
        </button>
      )}
    </div>
  );
}
