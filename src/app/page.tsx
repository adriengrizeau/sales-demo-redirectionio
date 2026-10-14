import Link from "next/link";
import { categories, products, posts } from "@/data/catalog";
import { ProductCard } from "@/components";

export default function Home() {
  const bestsellers = products.filter((p) => p.bestseller);
  return (
    <>
      <section className="hero wrap">
        <h1>La lumière juste, pièce par pièce.</h1>
        <p>Suspensions, lampes et appliques dessinées à Paris. Livraison offerte dès 80 €.</p>
        <p style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn" href="/catalogue">Voir le catalogue</Link>
          {/* Ancienne page promo supprimée : 404 de démo */}
          <Link className="btn ghost" href="/soldes-hiver">Soldes d'hiver</Link>
        </p>
      </section>
      <section className="section wrap">
        <h2>Nos univers</h2>
        <div className="cat-tiles">
          {categories.map((c) => (
            <Link key={c.slug} href={`/catalogue/${c.slug}`} className="cat-tile">
              <strong>{c.name}</strong>
              <span className="muted">{c.intro}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section wrap">
        <h2>Les best-sellers</h2>
        <div className="grid">
          {bestsellers.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
      <section className="section wrap">
        <h2>Conseils lumière</h2>
        <div className="post-list">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-item">
              <h3>{post.title}</h3>
              <span className="muted">{post.excerpt}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
