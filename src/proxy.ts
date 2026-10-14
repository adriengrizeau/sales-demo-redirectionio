import { createRedirectionIoMiddleware } from "@redirection.io/vercel-middleware/next";

// Toutes les requêtes passent par redirection.io, y compris les anciennes URL
// en .php / .html, robots.txt et sitemap.xml : c'est voulu pour la démo
// (le filtre par défaut du middleware ignore les chemins qui contiennent un point).
export default createRedirectionIoMiddleware({
  matcherRegex: "^/(?!_next/|_vercel|api/).*$",
});

export const config = {
  unstable_allowDynamic: ["/node_modules/@redirection.io/**"],
  matcher: ["/((?!_next/static|_next/image).*)"],
};
