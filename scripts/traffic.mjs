#!/usr/bin/env node
// Générateur de trafic réaliste pour le site de démo Atelier Lumen.
//
// Usage :
//   node scripts/traffic.mjs --url https://ton-site.vercel.app --count 300
//   node scripts/traffic.mjs --url https://ton-site.vercel.app --count 50 --profile legacy
//
// Profils disponibles : mix (défaut), humans, legacy, bots, ai, scanners, errors
// Aucune dépendance : Node 20+ suffit.

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith("--")) acc.push([cur.slice(2), arr[i + 1]?.startsWith("--") ? "true" : arr[i + 1] ?? "true"]);
    return acc;
  }, []),
);

const BASE = (args.url || process.env.DEMO_URL || "").replace(/\/$/, "");
const COUNT = Number(args.count || process.env.TRAFFIC_COUNT || 200);
const CONCURRENCY = Number(args.concurrency || 4);
const PROFILE = args.profile || "mix";
const DELAY_MS = Number(args.delay || 150);

if (!BASE) {
  console.error("Indique l'URL du site : --url https://ton-site.vercel.app (ou la variable DEMO_URL)");
  process.exit(1);
}

// --- Contenu du site (doit rester cohérent avec src/data/catalog.ts) ---------
const categories = ["suspensions", "lampes-a-poser", "appliques", "lampadaires", "ampoules", "exterieur"];
const products = [
  ["suspension-oslo", 45], ["suspension-bergen-xl", 46], ["suspension-rotin-sola", 47], ["suspension-verre-fumee", 48],
  ["lampe-bureau-ada", 51], ["lampe-chevet-nuage", 52], ["lampe-ceramique-terra", 53], ["lampe-baladeuse-pixie", 54],
  ["applique-lune", 61], ["applique-liseuse-kai", 62], ["applique-plissee-ines", 63],
  ["lampadaire-arc-milo", 71], ["lampadaire-trepied-sami", 72], ["lampadaire-liseuse-vera", 73],
  ["ampoule-filament-g95", 81], ["ampoule-connectee-e27", 82], ["ampoule-tube-t30", 83],
  ["guirlande-guinguette", 91], ["borne-solaire-dune", 92], ["applique-exterieure-cap", 93],
];
const categoryIds = { suspensions: 12, "lampes-a-poser": 13, appliques: 14, lampadaires: 15, ampoules: 16, exterieur: 17 };
const posts = [
  ["choisir-temperature-couleur", 412], ["hauteur-suspension-table", 398], ["eclairer-petit-salon", 377],
  ["guide-ampoules-led", 351], ["eclairage-terrasse", 330],
];
const retired = ["lampe-arc-milano", "suspension-copenhague", "ampoule-halogene-r7s"];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const weighted = (entries) => {
  const total = entries.reduce((s, [w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [w, v] of entries) { if ((r -= w) <= 0) return v; }
  return entries[entries.length - 1][1];
};

// --- User agents -------------------------------------------------------------
const UA = {
  chrome: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  safariMac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15",
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
  android: "Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36",
  firefox: "Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0",
  googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  googlebotMobile: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  bingbot: "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  gptbot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
  oaiSearch: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot",
  chatgptUser: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
  claudebot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  perplexity: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  meta: "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)",
  ahrefs: "Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)",
  semrush: "Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)",
  scanner: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
  curl: "curl/8.7.1",
  python: "python-requests/2.32.3",
};
const humanUA = () => weighted([[38, UA.chrome], [22, UA.iphone], [16, UA.android], [14, UA.safariMac], [10, UA.firefox]]);

const referer = () => weighted([
  [40, "https://www.google.com/"], [25, null], [8, "https://www.bing.com/"], [7, "https://www.instagram.com/"],
  [6, "https://www.pinterest.fr/"], [5, "https://chatgpt.com/"], [4, "https://www.perplexity.ai/"],
  [3, "https://duckduckgo.com/"], [2, "https://www.linkedin.com/"],
]);

const utm = () => weighted([
  [70, ""],
  [8, "?utm_source=newsletter&utm_medium=email&utm_campaign=rentree-2026"],
  [7, "?utm_source=instagram&utm_medium=social&utm_campaign=suspensions-automne"],
  [6, "?utm_source=google&utm_medium=cpc&utm_campaign=marque"],
  [5, "?utm_source=pinterest&utm_medium=social&utm_campaign=deco-salon"],
  [4, "?gclid=Cj0KCQjw-demo" + Math.floor(Math.random() * 1e6)],
]);

// --- Familles d'URL ------------------------------------------------------------
const validPath = () => weighted([
  [14, "/"],
  [10, "/catalogue"],
  [18, `/catalogue/${pick(categories)}`],
  [38, `/produit/${pick(products)[0]}`],
  [8, "/blog"],
  [10, `/blog/${pick(posts)[0]}`],
  [2, pick(["/a-propos", "/contact"])],
]);

// Anciennes URL PrestaShop / WordPress : 404 tant qu'aucune règle n'existe.
const legacyPath = () => {
  const [slug, id] = pick(products);
  const cat = pick(categories);
  const [postSlug, wpId] = pick(posts);
  return weighted([
    [20, `/fr/${categories[Math.floor(id / 10) - 4]}/${id}-${slug}.html`],
    [14, `/fr/${categoryIds[cat]}-${cat}`],
    [12, `/index.php?id_product=${id}&controller=product`],
    [8, `/index.php?id_category=${categoryIds[cat]}&controller=category`],
    [10, `/blog/index.php?p=${wpId}`],
    [8, `/2024/05/${postSlug}/`],
    [8, `/produit/${pick(retired)}`],
    [6, `/content/4-a-propos`],
    [5, `/promo-black-friday-2025`],
    [5, `/soldes-hiver`],
    [4, `/livraison-retours`],
    [4, `/catalogue/${cat}/`],
    [3, `/Catalogue/${cat.toUpperCase()}`],
  ]);
};

const scannerPath = () => pick([
  "/wp-login.php", "/wp-admin/", "/xmlrpc.php", "/.env", "/.git/config", "/wp-content/plugins/elementor/readme.txt",
  "/phpmyadmin/", "/admin.php", "/config.php.bak", "/.aws/credentials", "/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php",
  "/autodiscover/autodiscover.xml", "/.well-known/security.txt", "/server-status",
]);

const errorPath = () => pick([
  "/produit/suspension-olso", "/catalogue/suspension", "/blgo", "/produits", "/panier", "/mon-compte", "/null",
  "/undefined", "/apple-touch-icon.png", "/apple-touch-icon-precomposed.png", "/favicon.ico", "/ads.txt", "/meta.json",
]);

// --- Construction d'une requête selon le profil --------------------------------
function buildRequest(profile) {
  const kind = profile === "mix"
    ? weighted([[50, "humans"], [14, "legacy"], [12, "bots"], [10, "ai"], [7, "scanners"], [7, "errors"]])
    : profile;

  switch (kind) {
    case "humans": {
      const path = validPath() + utm();
      return { kind, path, headers: { "user-agent": humanUA(), ...(refOrNull()) } };
    }
    case "legacy":
      return { kind, path: legacyPath(), headers: { "user-agent": humanUA(), ...refOrNull("https://www.google.com/") } };
    case "bots": {
      const ua = weighted([[40, UA.googlebot], [20, UA.googlebotMobile], [20, UA.bingbot], [10, UA.ahrefs], [10, UA.semrush]]);
      const path = weighted([[55, validPath()], [30, legacyPath()], [10, "/robots.txt"], [5, "/sitemap.xml"]]);
      return { kind, path, headers: { "user-agent": ua } };
    }
    case "ai": {
      const ua = weighted([[22, UA.gptbot], [12, UA.oaiSearch], [12, UA.chatgptUser], [18, UA.claudebot], [14, UA.perplexity], [22, UA.meta]]);
      const path = weighted([[60, validPath()], [15, "/robots.txt"], [10, legacyPath()], [15, "/llms.txt"]]);
      return { kind, path, headers: { "user-agent": ua } };
    }
    case "scanners":
      return { kind, path: scannerPath(), headers: { "user-agent": pick([UA.scanner, UA.curl, UA.python]) } };
    case "errors":
    default:
      return { kind: "errors", path: errorPath(), headers: { "user-agent": humanUA(), ...refOrNull(BASE + "/") } };
  }
}

function refOrNull(forced) {
  const r = forced ?? referer();
  return r ? { referer: r } : {};
}

// --- Exécution -----------------------------------------------------------------
const stats = { byStatus: {}, byKind: {}, errors: 0 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function hit(i) {
  const { kind, path, headers } = buildRequest(PROFILE);
  const url = BASE + path;
  try {
    const res = await fetch(url, {
      redirect: "manual",
      headers: { "accept-language": "fr-FR,fr;q=0.9,en;q=0.6", accept: "text/html,*/*;q=0.8", ...headers },
    });
    await res.arrayBuffer().catch(() => {});
    stats.byStatus[res.status] = (stats.byStatus[res.status] || 0) + 1;
    stats.byKind[kind] = (stats.byKind[kind] || 0) + 1;
    if (args.verbose) {
      const loc = res.headers.get("location");
      console.log(`${String(i + 1).padStart(4)} ${res.status} ${kind.padEnd(8)} ${path}${loc ? "  ->  " + loc : ""}`);
    }
  } catch (e) {
    stats.errors++;
    if (args.verbose) console.log(`${String(i + 1).padStart(4)} ERR ${kind.padEnd(8)} ${path}  (${e.message})`);
  }
}

async function main() {
  console.log(`Trafic vers ${BASE} : ${COUNT} requêtes, profil « ${PROFILE} », ${CONCURRENCY} en parallèle`);
  let next = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (next < COUNT) {
      const i = next++;
      await hit(i);
      await sleep(DELAY_MS + Math.random() * DELAY_MS);
    }
  });
  await Promise.all(workers);
  console.log("\nCodes HTTP :", stats.byStatus);
  console.log("Familles   :", stats.byKind);
  if (stats.errors) console.log("Erreurs réseau :", stats.errors);
}

main();
