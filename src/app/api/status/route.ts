// Diagnostic : indique si la clé redirection.io est bien configurée,
// sans jamais l'afficher.
export const dynamic = "force-dynamic";

export function GET() {
  const token = process.env.REDIRECTIONIO_TOKEN ?? "";
  return Response.json({
    redirectionioTokenConfigured: token.length > 0,
    redirectionioTokenLength: token.length,
    instanceName: process.env.REDIRECTIONIO_INSTANCE_NAME ?? null,
    addHeaderRuleIds: process.env.REDIRECTIONIO_ADD_HEADER_RULE_IDS ?? null,
    deployedCommit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
  });
}
