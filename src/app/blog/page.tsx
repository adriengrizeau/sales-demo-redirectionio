import Link from "@/link";
import type { Metadata } from "next";
import { posts } from "@/data/catalog";

export const metadata: Metadata = { title: "Conseils lumière" };

export default function Blog() {
  return (
    <div className="wrap">
      <p className="breadcrumb"><Link href="/">Accueil</Link> / Conseils</p>
      <section className="section">
        <h2>Conseils lumière</h2>
        <div className="post-list">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-item">
              <h3>{post.title}</h3>
              <span className="muted">
                {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} · {post.excerpt}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
