import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { euro, findCategory, findProduct, products, productsIn } from "@/data/catalog";
import { ProductCard, Swatch } from "@/components";

// Les produits retirés (voir retiredProducts) ne sont pas générés : 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = findProduct(slug);
  return { title: p?.name ?? "Produit", description: p?.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = findProduct(slug);
  if (!p) notFound();
  const cat = findCategory(p.category)!;
  const related = productsIn(p.category).filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <div className="wrap">
      <p className="breadcrumb">
        <Link href="/">Accueil</Link> / <Link href="/catalogue">Catalogue</Link> /{" "}
        <Link href={`/catalogue/${cat.slug}`}>{cat.name}</Link> / {p.name}
      </p>
      <div className="product">
        <Swatch color={p.color} />
        <div>
          <h1>{p.name}</h1>
          <p className="muted">{p.description}</p>
          <span className="price">{euro(p.price)}</span>
          <button className="btn" type="button">Ajouter au panier</button>
          <dl className="specs" style={{ marginTop: 28 }}>
            <dt>Matière</dt><dd>{p.material}</dd>
            <dt>Référence</dt><dd>AL-{p.legacyId.toString().padStart(4, "0")}</dd>
            <dt>Livraison</dt><dd>48 à 72 h</dd>
          </dl>
        </div>
      </div>
      {related.length > 0 && (
        <section className="section">
          <h2>Dans la même collection</h2>
          <div className="grid">
            {related.map((r) => <ProductCard key={r.slug} product={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
