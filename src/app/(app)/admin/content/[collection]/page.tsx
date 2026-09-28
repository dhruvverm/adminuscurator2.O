import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { collections } from "@/lib/admin-schema";
import { getContent } from "@/lib/content";
import { read } from "@/lib/store";
import type { ManagedContent } from "@/content/types";
import { CollectionEditor } from "@/components/admin/CollectionEditor";

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }) {
  const def = collections[(await params).collection as keyof ManagedContent];
  return { title: def?.title ?? "Content" };
}

export default async function ContentPage({ params }: { params: Promise<{ collection: string }> }) {
  await requireRole("editor");
  const key = (await params).collection as keyof ManagedContent;
  const def = collections[key];
  if (!def) notFound();
  const [content, { content: overrides }] = await Promise.all([getContent(), read()]);
  return (
    <>
      <div className="app-header">
        <div>
          <h1>{def.title}</h1>
          <p>{def.description}</p>
        </div>
        <span className={`pill ${overrides[key] ? "pill--brand" : ""}`}>{overrides[key] ? "Customized" : "Using defaults from code"}</span>
      </div>
      <CollectionEditor collectionKey={key} initial={content[key] as unknown as Record<string, unknown>[]} />
    </>
  );
}
