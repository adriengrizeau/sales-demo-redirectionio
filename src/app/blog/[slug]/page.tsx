import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findPost } from "@/data/catalog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  return { title: post?.title ?? "Conseil", description: post?.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  return (
    <div className="wrap">
      <p className="breadcrumb"><Link href="/">Accueil</Link> / <Link href="/blog">Conseils</Link></p>
      <article className="post">
        <h1>{post.title}</h1>
        <p className="muted">
          {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        {post.body.map((para, i) => <p key={i}>{para}</p>)}
        <p>
          {/* Lien vers un produit retiré du catalogue : 404 de démo avec referer interne */}
          À lire aussi : notre ancien best-seller, le <Link href="/produit/lampe-arc-milano">lampadaire Milano</Link>.
        </p>
      </article>
    </div>
  );
}
