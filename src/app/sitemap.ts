import type { MetadataRoute } from "next";
import { categories, posts, products } from "@/data/catalog";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
  const paths = [
    "/", "/catalogue", "/blog", "/a-propos", "/contact",
    ...categories.map((c) => `/catalogue/${c.slug}`),
    ...products.map((p) => `/produit/${p.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((p) => ({ url: `${base}${p}` }));
}
