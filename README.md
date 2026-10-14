# Atelier Lumen : site de démo redirection.io

Atelier Lumen est une boutique de luminaires **fictive**. Elle sert de terrain de jeu pour faire des démonstrations de redirection.io sur un vrai site en ligne, avec du vrai trafic :

- un site Next.js déployé gratuitement sur Vercel ;
- le middleware officiel [`@redirection.io/vercel-middleware`](https://github.com/redirectionio/vercel-middleware), par lequel passent toutes les requêtes (logs, redirections, en-têtes, règles SEO) ;
- un générateur de trafic (visiteurs, Googlebot, bots IA, scanners, anciennes URL) lancé toutes les heures par GitHub Actions ;
- un scénario de migration intégré : l'ancien site PrestaShop/WordPress a laissé des centaines d'URL orphelines qui renvoient des 404.

Coût : 0 € (Vercel Hobby, GitHub Actions sur dépôt public, offre gratuite de redirection.io).

---

## Mise en place (une seule fois, environ 15 minutes)

### 1. Créer le projet redirection.io

1. Dans le manager redirection.io, crée un projet, par exemple « Sales demo – Atelier Lumen ».
2. Ouvre l'écran **Instances** puis **Setup on your infrastructure** et copie la **clé du projet** (project key).

### 2. Déployer sur Vercel

1. Va sur [vercel.com/new](https://vercel.com/new) et connecte-toi avec ton compte GitHub.
2. Importe le dépôt `sales-demo-redirectionio`. Vercel détecte Next.js automatiquement, ne change rien.
3. Avant de cliquer sur **Deploy**, ouvre **Environment Variables** et ajoute :

   | Nom | Valeur |
   |---|---|
   | `REDIRECTIONIO_TOKEN` | la clé du projet copiée à l'étape 1 |
   | `REDIRECTIONIO_INSTANCE_NAME` | `vercel-sales-demo` |
   | `REDIRECTIONIO_ADD_HEADER_RULE_IDS` | `true` |

4. Clique sur **Deploy**. Une à deux minutes plus tard, le site est en ligne sur une adresse du type `https://sales-demo-redirectionio.vercel.app`.
5. Vérification : ouvre le site, puis l'écran **Instances** de redirection.io. L'instance `vercel-sales-demo` doit apparaître, et les premiers logs arrivent dans la foulée.

### 3. Brancher le générateur de trafic

1. Sur GitHub, dans le dépôt : **Settings > Secrets and variables > Actions > onglet Variables > New repository variable**.
2. Nom : `DEMO_URL`. Valeur : l'adresse Vercel, sans slash final (par exemple `https://sales-demo-redirectionio.vercel.app`).
3. Onglet **Actions** : si GitHub le demande, active les workflows. Puis ouvre **Trafic de démo > Run workflow** pour un premier envoi immédiat.

Ensuite, le workflow tourne tout seul toutes les heures : environ 120 à 240 requêtes en journée et 30 à 70 la nuit, soit environ 3 500 par jour.

> GitHub met en pause les workflows planifiés d'un dépôt public après 60 jours sans commit. Il suffit alors de cliquer sur « Enable workflow » dans l'onglet Actions.

### 4. Utiliser le projet avec le MCP

Le projet apparaît dans `list_projects` du serveur MCP redirection.io. Tu peux y créer, tester et publier des règles comme sur un projet client, sans aucun risque.

---

## Envoyer du trafic à la demande

Depuis ton ordinateur (Node 20 ou plus, aucune installation nécessaire) :

```bash
node scripts/traffic.mjs --url https://ton-site.vercel.app --count 300
node scripts/traffic.mjs --url https://ton-site.vercel.app --count 50 --profile legacy --verbose
```

Ou depuis GitHub : **Actions > Trafic de démo > Run workflow**, en choisissant le nombre de requêtes et le profil.

| Profil | Ce qu'il envoie |
|---|---|
| `mix` (défaut) | 50 % visiteurs, 14 % anciennes URL, 12 % moteurs et outils SEO, 10 % bots IA, 7 % scanners, 7 % erreurs diverses |
| `humans` | visiteurs sur des pages valides, avec referers (Google, Instagram, ChatGPT…) et UTM |
| `legacy` | anciennes URL PrestaShop/WordPress : des 404 tant qu'aucune règle n'existe |
| `bots` | Googlebot, Bingbot, AhrefsBot, SemrushBot, robots.txt, sitemap.xml |
| `ai` | GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Meta-ExternalAgent, /llms.txt |
| `scanners` | /wp-login.php, /.env, /xmlrpc.php… |
| `errors` | fautes de frappe, /null, favicon et apple-touch-icon manquants, /meta.json |

**Note sur les « faux Googlebot »** : les requêtes « Googlebot » partent des serveurs de GitHub ou de ton poste, pas de Google. redirection.io les classe donc comme du Googlebot non vérifié. C'est voulu : ça permet de montrer la détection des faux Googlebot.

---

## Scénarios de démo

Voir [docs/SCENARIOS.md](docs/SCENARIOS.md).

---

## Développement local

```bash
npm install
cp .env.example .env.local   # puis renseigner REDIRECTIONIO_TOKEN
npm run dev
```

## Structure

```
src/proxy.ts              middleware redirection.io (toutes les URL, y compris .php/.html)
src/instrumentation.ts    envoi des logs vers redirection.io
src/data/catalog.ts       catalogue fictif : catégories, produits, articles, produits retirés
src/app/                  pages (accueil, catalogue, produit, blog, à propos, contact, 404)
scripts/traffic.mjs       générateur de trafic
.github/workflows/        trafic automatique toutes les heures
```
