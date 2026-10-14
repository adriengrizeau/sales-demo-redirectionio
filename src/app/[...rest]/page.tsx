import { notFound } from "next/navigation";

// Attrape toutes les URL inconnues (anciennes URL, fautes de frappe…) pour que
// la 404 soit rendue par le serveur, et donc loguée dans redirection.io.
export const dynamic = "force-dynamic";

export default function CatchAll() {
  notFound();
}
