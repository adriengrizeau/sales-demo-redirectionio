import Link from "@/link";
import type { Metadata } from "next";
import { categories, products } from "@/data/catalog";
import { ProductCard } from "@/components";

export const metadata: Metadata = { title: "Catalogue" };

export default function Catalogue() {
  return (
    <div className="wrap">
      <p className="breadcrumb"><Link href="/">Accueil</Link> / Catalogue</p>
      <section className="section">
        <h2>Tout le catalogue</h2>
        <div className="cat-tiles" style={{ marginBottom: 32 }}>
          {categories.map((c) => (
            <Link key={c.slug} href={`/catalogue/${c.slug}`} className="cat-tile">
              <strong>{c.name}</strong>
            </Link>
          ))}
        </div>
        <div className="grid">
          {products.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </div>
  );
}
