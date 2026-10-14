# Scénarios de démo : Atelier Lumen

L'histoire racontée : Atelier Lumen tournait sous PrestaShop (boutique) et WordPress (blog) jusqu'en 2025, puis a migré vers un nouveau site. Les anciennes URL vivent encore dans Google, les backlinks et les favoris. Le générateur de trafic les rejoue toutes les heures, donc **les 404 s'accumulent dans les logs jusqu'à ce qu'on crée les règles**.

Pour chaque scénario : ce qu'on montre, les URL concernées, et une phrase à donner à Claude via le MCP.

---

## 1. La migration : rattraper les anciennes URL produit

| Ancienne URL (404) | Nouvelle URL |
|---|---|
| `/fr/suspensions/45-suspension-oslo.html` | `/produit/suspension-oslo` |
| `/fr/lampes-a-poser/51-lampe-bureau-ada.html` | `/produit/lampe-bureau-ada` |

Une seule règle avec des **marqueurs** (catégorie, identifiant, slug) couvre les 20 produits.

> « Sur le projet Atelier Lumen, crée en brouillon une règle 301 qui redirige `/fr/{catégorie}/{id}-{slug}.html` vers `/produit/{slug}`, avec des exemples, puis vérifie son impact. »

## 2. Les anciennes catégories et les paramètres PrestaShop

| Ancienne URL | Cible |
|---|---|
| `/fr/12-suspensions` | `/catalogue/suspensions` |
| `/index.php?id_category=12&controller=category` | `/catalogue/suspensions` |
| `/index.php?id_product=45&controller=product` | `/produit/suspension-oslo` |

Ce scénario montre le matching sur la query string. Correspondance des identifiants : 12 suspensions, 13 lampes à poser, 14 appliques, 15 lampadaires, 16 ampoules, 17 extérieur. Les identifiants produit sont dans `src/data/catalog.ts` (champ `legacyId`).

## 3. Le blog WordPress

| Ancienne URL | Cible |
|---|---|
| `/blog/index.php?p=412` | `/blog/choisir-temperature-couleur` |
| `/2024/05/eclairage-terrasse/` | `/blog/eclairage-terrasse` |

Correspondance : 412 température de couleur, 398 hauteur de suspension, 377 petit salon, 351 ampoules LED, 330 terrasse.

## 4. Les produits retirés du catalogue

`/produit/lampe-arc-milano`, `/produit/suspension-copenhague` et `/produit/ampoule-halogene-r7s` renvoient une 404. En plus, le site lui-même fait un lien vers `/produit/lampe-arc-milano` depuis chaque article de blog : on voit donc le **referer interne** dans les logs.

Choix à présenter : une 301 vers la catégorie (lampadaires, suspensions, ampoules) ou une **410 Gone** pour désindexer proprement.

## 5. Les liens cassés du site

- `/livraison-retours` : lien présent dans le pied de page de toutes les pages ;
- `/soldes-hiver` : bouton sur la page d'accueil ;
- `/promo-black-friday-2025` : ancienne campagne.

C'est la démonstration « vous corrigez sans attendre une mise en production » : une redirection, ou une page servie directement par une règle.

## 6. Normalisation des URL

`/Catalogue/SUSPENSIONS` (majuscules) renvoie une 404. `/catalogue/suspensions/` (slash final) n'est pas normalisé par le site : selon le cas, c'est un doublon de la page ou une erreur. Une règle de normalisation règle les deux et évite le contenu dupliqué.

## 7. Bots IA et contenus pour les LLM

- Les logs montrent GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot et Meta-ExternalAgent.
- `/llms.txt` renvoie une 404 : on peut le servir directement par une règle, sans toucher au code.
- Recettes disponibles dans le MCP : bloquer les bots IA, ou convertir le HTML en Markdown pour eux.

> « Quels bots IA crawlent le site de démo cette semaine, et sur quelles pages ? »

## 8. Sécurité : scanners et fichiers sensibles

`/wp-login.php`, `/.env`, `/xmlrpc.php`, `/.git/config`… La recette « block suspicious requests or sensitive files access » les bloque. Les recettes HSTS, Referrer-Policy, Permissions-Policy et X-Frame-Options se montrent sur le même projet.

## 9. Faux Googlebot

Les requêtes « Googlebot » du générateur partent de GitHub, pas de Google : redirection.io les identifie comme non vérifiées. Démonstration :

> « Montre-moi les faux Googlebot sur le projet de démo. »

## 10. SEO technique : en-têtes et indexation

- Ajouter `X-Robots-Tag: noindex` sur les URL avec `utm_` ou `gclid` ;
- poser une balise canonical ou un en-tête Link ;
- longue durée de cache sur les images (recette).

L'en-tête `X-RedirectionIo-RuleIds` est activé sur ce projet : dans les outils de développement du navigateur, on voit quelle règle s'est appliquée à chaque réponse.

---

## Remettre la démo à zéro

Supprime (ou dépublie) les règles créées pendant la démo. Le générateur continue d'envoyer les anciennes URL, donc les 404 réapparaissent dans les logs dès l'heure suivante.
