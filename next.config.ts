import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Les URL sont gérées telles quelles : c'est redirection.io qui décide
  // des redirections, pas Next.js.
  // Next.js ne redirige pas lui-même les slashs finaux : on laisse
  // redirection.io s'en charger (scénario « normalisation des URL »).
  skipTrailingSlashRedirect: true,
  poweredByHeader: false,
};

export default nextConfig;
