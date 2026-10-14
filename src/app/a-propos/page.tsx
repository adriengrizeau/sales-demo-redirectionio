import type { Metadata } from "next";

export const metadata: Metadata = { title: "À propos" };

export default function About() {
  return (
    <div className="wrap">
      <article className="post">
        <h1>À propos d'Atelier Lumen</h1>
        <p>Atelier Lumen est une boutique <strong>fictive</strong>. Elle sert de terrain de jeu pour montrer ce que redirection.io permet de faire sur un vrai site : redirections, gestion des 404, en-têtes HTTP, règles SEO et analyse du trafic des robots.</p>
        <p>L'histoire inventée : la boutique tournait sous PrestaShop jusqu'en 2025, puis a migré vers un nouveau site. Les anciennes URL circulent encore dans les backlinks, les favoris et l'index de Google. C'est exactement le scénario d'une migration.</p>
      </article>
    </div>
  );
}
