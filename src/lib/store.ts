/**
 * Minimal JSON-file data store.
 *
 * Good for development and small single-server deployments. All data
 * access goes through the functions exported here, so swapping in a
 * real database (Postgres, MySQL, a hosted service…) only means
 * re-implementing this module with the same signatures.
 *
 * ⚠️ Serverless/ephemeral hosts (e.g. Vercel) do not keep files between
 * requests — use a database there.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import type { BillingInterval, ManagedContent } from "@/content/types";
import { hashPassword, randomId } from "./crypto";

export type Role = "customer" | "editor" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string | null;
  googleId?: string;
  role: Role;
  createdAt: string;
  /** Incrementing this invalidates all of the user's existing sessions. */
  sessionVersion: number;
  subscription?: {
    planId: string;
    interval: BillingInterval;
    status: "active" | "cancelled";
    since: string;
  };
}

export type OrderStatus = "pending" | "paid" | "failed" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  email: string;
  planId: string;
  planName: string;
  interval: BillingInterval;
  /** Monthly-equivalent price at time of order, or null if not yet priced. */
  amount: number | null;
  currency: string;
  status: OrderStatus;
  provider: "stripe" | "demo";
  providerRef?: string;
  billing: { name: string; company: string; country: string; taxId: string };
  createdAt: string;
  paidAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "archived";
  createdAt: string;
}

interface PasswordReset {
  tokenHash: string;
  userId: string;
  expiresAt: string;
}

interface Data {
  users: User[];
  orders: Order[];
  messages: ContactMessage[];
  resets: PasswordReset[];
  content: Partial<ManagedContent>;
}

const DATA_FILE = process.env.DATA_FILE || path.join(/* turbopackIgnore: true */ process.cwd(), "data", "store.json");
const empty = (): Data => ({ users: [], orders: [], messages: [], resets: [], content: {} });

let queue: Promise<unknown> = Promise.resolve();
let seeded = false;

async function readData(): Promise<Data> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return { ...empty(), ...JSON.parse(raw) };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return empty();
    throw err;
  }
}

async function writeData(data: Data) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, DATA_FILE);
}

/** Seed the first administrator from ADMIN_EMAIL / ADMIN_PASSWORD. */
async function seedAdmin(data: Data): Promise<boolean> {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || data.users.some((u) => u.role === "admin")) return false;
  const existing = data.users.find((u) => u.email === email);
  if (existing) {
    existing.role = "admin";
  } else {
    data.users.push({
      id: randomId("usr_"),
      email,
      name: "Administrator",
      passwordHash: await hashPassword(password),
      role: "admin",
      createdAt: new Date().toISOString(),
      sessionVersion: 1,
    });
  }
  return true;
}

/** Read-only snapshot. */
export async function read(): Promise<Data> {
  if (!seeded) {
    await mutate(() => undefined);
  }
  return readData();
}

/** Serialized read-modify-write. */
export function mutate<T>(fn: (data: Data) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const data = await readData();
    let changed = false;
    if (!seeded) {
      changed = await seedAdmin(data);
      seeded = true;
    }
    const before = JSON.stringify(data);
    const result = await fn(data);
    if (changed || JSON.stringify(data) !== before) await writeData(data);
    return result;
  });
  queue = run.catch(() => undefined);
  return run;
}

// ── Users ──────────────────────────────────────────────────────

export async function findUserByEmail(email: string) {
  const data = await read();
  return data.users.find((u) => u.email === email.trim().toLowerCase()) ?? null;
}

export async function findUserById(id: string) {
  const data = await read();
  return data.users.find((u) => u.id === id) ?? null;
}

export async function createUser(input: { email: string; name: string; passwordHash: string | null; googleId?: string }) {
  return mutate((data) => {
    const email = input.email.trim().toLowerCase();
    if (data.users.some((u) => u.email === email)) throw new Error("EMAIL_TAKEN");
    const user: User = {
      id: randomId("usr_"),
      email,
      name: input.name.trim(),
      passwordHash: input.passwordHash,
      googleId: input.googleId,
      role: "customer",
      createdAt: new Date().toISOString(),
      sessionVersion: 1,
    };
    data.users.push(user);
    return user;
  });
}

export async function updateUser(id: string, patch: (user: User) => void) {
  return mutate((data) => {
    const user = data.users.find((u) => u.id === id);
    if (!user) throw new Error("NOT_FOUND");
    patch(user);
    return user;
  });
}

// ── Password resets ───────────────────────────────────────────

export async function savePasswordReset(userId: string, tokenHash: string, ttlMinutes = 60) {
  return mutate((data) => {
    const now = Date.now();
    data.resets = data.resets.filter((r) => r.userId !== userId && new Date(r.expiresAt).getTime() > now);
    data.resets.push({ userId, tokenHash, expiresAt: new Date(now + ttlMinutes * 60_000).toISOString() });
  });
}

/** Consumes a reset token; returns the userId if valid. */
export async function consumePasswordReset(tokenHash: string) {
  return mutate((data) => {
    const reset = data.resets.find((r) => r.tokenHash === tokenHash);
    data.resets = data.resets.filter((r) => r.tokenHash !== tokenHash);
    if (!reset || new Date(reset.expiresAt).getTime() < Date.now()) return null;
    return reset.userId;
  });
}

// ── Orders ────────────────────────────────────────────────────

export async function createOrder(input: Omit<Order, "id" | "createdAt" | "status">) {
  return mutate((data) => {
    const order: Order = { ...input, id: randomId("ord_"), status: "pending", createdAt: new Date().toISOString() };
    data.orders.push(order);
    return order;
  });
}

export async function findOrder(id: string) {
  const data = await read();
  return data.orders.find((o) => o.id === id) ?? null;
}

/** Marks an order paid and grants the plan to its user. Idempotent. */
export async function markOrderPaid(id: string, providerRef?: string) {
  return mutate((data) => {
    const order = data.orders.find((o) => o.id === id);
    if (!order) return null;
    if (order.status !== "paid") {
      order.status = "paid";
      order.paidAt = new Date().toISOString();
      if (providerRef) order.providerRef = providerRef;
      const user = data.users.find((u) => u.id === order.userId);
      if (user) {
        user.subscription = {
          planId: order.planId,
          interval: order.interval,
          status: "active",
          since: order.paidAt,
        };
      }
    }
    return order;
  });
}

export async function setOrderStatus(id: string, status: OrderStatus) {
  return mutate((data) => {
    const order = data.orders.find((o) => o.id === id);
    if (order) order.status = status;
    return order ?? null;
  });
}

// ── Contact messages ──────────────────────────────────────────

export async function createMessage(input: Omit<ContactMessage, "id" | "createdAt" | "status">) {
  return mutate((data) => {
    const msg: ContactMessage = { ...input, id: randomId("msg_"), status: "new", createdAt: new Date().toISOString() };
    data.messages.push(msg);
    return msg;
  });
}

export async function setMessageStatus(id: string, status: ContactMessage["status"]) {
  return mutate((data) => {
    const msg = data.messages.find((m) => m.id === id);
    if (msg) msg.status = status;
  });
}

// ── Managed content ───────────────────────────────────────────

export async function saveContent<K extends keyof ManagedContent>(key: K, value: ManagedContent[K]) {
  return mutate((data) => {
    data.content[key] = value;
  });
}

export async function resetContent(key: keyof ManagedContent) {
  return mutate((data) => {
    delete data.content[key];
  });
}
