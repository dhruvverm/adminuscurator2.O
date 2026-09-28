import { notFound } from "next/navigation";
import { legalPages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { SimplePageView } from "@/components/marketing/SimplePageView";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = legalPages.find((p) => p.slug === slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description, path: `/legal/${page.slug}` });
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = legalPages.find((p) => p.slug === slug);
  if (!page) notFound();
  return <SimplePageView page={page} eyebrow="Legal" isLegal />;
}
