// Diagnostic : indique si la clé redirection.io est configurée et acceptée
// par l'API, sans jamais l'afficher.
export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.REDIRECTIONIO_TOKEN ?? "";
  let agentActionStatus: number | string | null = null;
  let agentActionBody: string | null = null;
  if (token) {
    try {
      const res = await fetch(`https://agent.redirection.io/${token}/action`, {
        method: "POST",
        body: "",
        headers: { "User-Agent": "sales-demo-diagnostic" },
        cache: "no-store",
      });
      agentActionStatus = res.status;
      agentActionBody = (await res.text()).slice(0, 200);
    } catch (e) {
      agentActionStatus = `error: ${(e as Error).message}`;
    }
  }
  return Response.json({
    redirectionioTokenConfigured: token.length > 0,
    redirectionioTokenLength: token.length,
    tokenHasColon: token.includes(":"),
    tokenHasWhitespace: /\s/.test(token),
    agentActionStatus,
    agentActionBody,
    instanceName: process.env.REDIRECTIONIO_INSTANCE_NAME ?? null,
    deployedCommit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
  });
}
