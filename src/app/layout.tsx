import type { Metadata } from "next";
import Link from "@/link";
import "./globals.css";
import { categories } from "@/data/catalog";

// Chaque page est rendue par le serveur à chaque requête : c'est ce qui
// déclenche l'envoi des logs à redirection.io (instrumentation.ts).
// Une page pré-générée servie depuis le cache Vercel ne serait pas loguée.
export const dynamic = "force-dynamic";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Atelier Lumen — Luminaires et décoration", template: "%s — Atelier Lumen" },
  description: "Atelier Lumen, boutique fictive de luminaires créée pour la démonstration redirection.io.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="demo-banner">
          Site de démonstration fictif — <a href="https://redirection.io">propulsé par redirection.io</a>
        </div>
        <header className="site-header">
          <div className="wrap header-inner">
            <Link href="/" className="logo">Atelier <span>Lumen</span></Link>
            <nav className="main-nav">
              <Link href="/catalogue">Catalogue</Link>
              {categories.slice(0, 4).map((c) => (
                <Link key={c.slug} href={`/catalogue/${c.slug}`}>{c.name}</Link>
              ))}
              <Link href="/blog">Conseils</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap footer-grid">
            <div>
              <p className="logo">Atelier <span>Lumen</span></p>
              <p className="muted">Luminaires dessinés à Paris. Marque fictive.</p>
            </div>
            <div>
              <h4>Boutique</h4>
              <Link href="/catalogue">Tout le catalogue</Link>
              <Link href="/catalogue/ampoules">Ampoules</Link>
              <Link href="/catalogue/exterieur">Extérieur</Link>
            </div>
            <div>
              <h4>Aide</h4>
              {/* Lien volontairement cassé : la page n'existe pas (404 de démo) */}
              <Link href="/livraison-retours">Livraison et retours</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/a-propos">À propos</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
