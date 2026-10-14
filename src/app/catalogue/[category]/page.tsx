import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findCategory, productsIn } from "@/data/catalog";
import { ProductCard } from "@/components";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = findCategory(category);
  return { title: c?.name ?? "Catégorie", description: c?.intro };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = findCategory(category);
  if (!c) notFound();
  const items = productsIn(c.slug);
  return (
    <div className="wrap">
      <p className="breadcrumb">
        <Link href="/">Accueil</Link> / <Link href="/catalogue">Catalogue</Link> / {c.name}
      </p>
      <section className="section">
        <h2>{c.name}</h2>
        <p className="muted" style={{ marginTop: -8, marginBottom: 24 }}>{c.intro}</p>
        <div className="grid">
          {items.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </div>
  );
}
