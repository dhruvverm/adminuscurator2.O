import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { read } from "@/lib/store";
import { Icon } from "@/components/ui/Icon";
import { MessageActions } from "@/components/admin/RowControls";
import { OrderStatusPill } from "@/components/admin/StatusPill";

export const metadata = { title: "Messages" };

export default async function MessagesPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  await requireRole("editor");
  const { view } = await searchParams;
  const archived = view === "archived";
  const { messages } = await read();
  const list = [...messages].reverse().filter((m) => (archived ? m.status === "archived" : m.status !== "archived"));
  return (
    <>
      <div className="app-header">
        <div>
          <h1>Contact form messages</h1>
          <p>Submissions from the website contact form.</p>
        </div>
        <div className="billing-toggle" role="group" aria-label="Filter">
          <Link href="/admin/messages" aria-current={!archived ? "page" : undefined}>Inbox</Link>
          <Link href="/admin/messages?view=archived" aria-current={archived ? "page" : undefined}>Archived</Link>
        </div>
      </div>
      {list.length ? (
        <div style={{ display: "grid", gap: 12 }}>
          {list.map((m) => (
            <article key={m.id} className="panel">
              <div className="panel__head" style={{ flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}>{m.subject} <OrderStatusPill status={m.status} /></h2>
                  <p className="subtle" style={{ fontSize: "0.8125rem" }}>
                    {m.name} · <a className="link" href={`mailto:${m.email}`}>{m.email}</a> · {m.company}
                    {m.phone && ` · ${m.phone}`} · {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
                <MessageActions id={m.id} status={m.status} />
              </div>
              <div className="panel__body" style={{ whiteSpace: "pre-wrap" }}>{m.message}</div>
            </article>
          ))}
        </div>
      ) : (
        <div className="panel"><div className="empty"><Icon name="inbox" size={32} />{archived ? "No archived messages." : "No messages yet."}</div></div>
      )}
    </>
  );
}
