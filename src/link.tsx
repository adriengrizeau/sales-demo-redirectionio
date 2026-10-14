import type { AnchorHTMLAttributes } from "react";

// Liens HTML classiques (rechargement complet de la page) plutôt que next/link :
// pas de préchargement en arrière-plan ni de requêtes « ?_rsc= », chaque clic
// apparaît dans les logs redirection.io comme une vraie visite de page.
export default function Link(props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a {...props} />;
}
