import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <h1>404</h1>
      <p className="muted">Cette page n'existe pas (ou plus).</p>
      <p><Link className="btn" href="/catalogue">Retour au catalogue</Link></p>
    </div>
  );
}
