import type { OrderStatus } from "@/lib/store";

const tone: Record<string, string> = {
  paid: "pill--success",
  active: "pill--success",
  pending: "pill--warning",
  new: "pill--brand",
  failed: "pill--danger",
  cancelled: "",
  archived: "",
  read: "",
  draft: "pill--warning",
};

export function OrderStatusPill({ status }: { status: OrderStatus | string }) {
  return <span className={`pill ${tone[status] ?? ""}`}>{status[0].toUpperCase() + status.slice(1)}</span>;
}
