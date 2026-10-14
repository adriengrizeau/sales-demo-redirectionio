// Atelier Lumen est une marque fictive créée pour la démo redirection.io.
// Toute ressemblance avec une enseigne existante serait fortuite.

export type Category = {
  slug: string;
  name: string;
  intro: string;
  // Ancien identifiant PrestaShop, utile pour les scénarios de migration
  legacyId: number;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  color: string; // couleur de la vignette (pas d'images à héberger)
  material: string;
  description: string;
  legacyId: number;
  bestseller?: boolean;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
  legacyWpId: number;
};

export const categories: Category[] = [
  { slug: "suspensions", name: "Suspensions", legacyId: 12, intro: "Des suspensions pour éclairer une table, un îlot ou une cage d'escalier." },
  { slug: "lampes-a-poser", name: "Lampes à poser", legacyId: 13, intro: "Lampes de bureau, de chevet et d'appoint." },
  { slug: "appliques", name: "Appliques murales", legacyId: 14, intro: "Une lumière indirecte, sans encombrer le sol." },
  { slug: "lampadaires", name: "Lampadaires", legacyId: 15, intro: "Pour les coins lecture et les grands volumes." },
  { slug: "ampoules", name: "Ampoules LED", legacyId: 16, intro: "Filaments, globes et ampoules connectées." },
  { slug: "exterieur", name: "Éclairage extérieur", legacyId: 17, intro: "Terrasses, balcons et jardins." },
];

const p = (
  slug: string, name: string, category: string, price: number, color: string,
  material: string, legacyId: number, description: string, bestseller = false,
): Product => ({ slug, name, category, price, color, material, legacyId, description, bestseller });

export const products: Product[] = [
  p("suspension-oslo", "Suspension Oslo", "suspensions", 149, "#d9c7a7", "Chêne et lin", 45, "Abat-jour en lin lavé sur une structure en chêne massif. Diamètre 45 cm.", true),
  p("suspension-bergen-xl", "Suspension Bergen XL", "suspensions", 229, "#1f2a36", "Métal laqué", 46, "Grande coupole en métal laqué bleu nuit, intérieur doré."),
  p("suspension-rotin-sola", "Suspension Sola en rotin", "suspensions", 119, "#c89b5e", "Rotin naturel", 47, "Tressée à la main, elle projette des motifs au plafond.", true),
  p("suspension-verre-fumee", "Suspension Brume", "suspensions", 179, "#6b6f73", "Verre fumé", 48, "Globe en verre soufflé fumé, culot laiton."),
  p("lampe-bureau-ada", "Lampe de bureau Ada", "lampes-a-poser", 89, "#2f6f5e", "Acier", 51, "Bras articulé, tête orientable, interrupteur sur le câble.", true),
  p("lampe-chevet-nuage", "Lampe de chevet Nuage", "lampes-a-poser", 59, "#efe9e1", "Opaline", 52, "Globe en opaline blanche, lumière douce pour la lecture."),
  p("lampe-ceramique-terra", "Lampe Terra en céramique", "lampes-a-poser", 135, "#b5603c", "Céramique émaillée", 53, "Pied en grès émaillé terracotta, abat-jour plissé."),
  p("lampe-baladeuse-pixie", "Baladeuse Pixie", "lampes-a-poser", 69, "#e6b84a", "Aluminium", 54, "Sans fil, rechargeable en USB-C, 12 h d'autonomie."),
  p("applique-lune", "Applique Lune", "appliques", 99, "#e9dfc9", "Laiton et verre", 61, "Disque en verre dépoli sur platine en laiton brossé.", true),
  p("applique-liseuse-kai", "Applique liseuse Kai", "appliques", 115, "#3a3a3a", "Acier noir", 62, "Bras pivotant à 180°, idéale en tête de lit."),
  p("applique-plissee-ines", "Applique plissée Inès", "appliques", 79, "#d8a7a0", "Papier plissé", 63, "Abat-jour en papier plissé rose poudré."),
  p("lampadaire-arc-milo", "Lampadaire arc Milo", "lampadaires", 289, "#8a8f94", "Acier et marbre", 71, "Arc de 1,80 m, socle en marbre blanc.", true),
  p("lampadaire-trepied-sami", "Lampadaire trépied Sami", "lampadaires", 199, "#a77b4f", "Noyer", 72, "Trépied en noyer massif, abat-jour en coton."),
  p("lampadaire-liseuse-vera", "Lampadaire liseuse Vera", "lampadaires", 169, "#20304a", "Métal", 73, "Double éclairage : plafonnier et liseuse orientable."),
  p("ampoule-filament-g95", "Ampoule filament G95", "ampoules", 14, "#f2c66d", "Verre ambré", 81, "Globe 95 mm, 4 W, 2200 K, dimmable."),
  p("ampoule-connectee-e27", "Ampoule connectée E27", "ampoules", 24, "#f5f5f0", "Polycarbonate", 82, "Blanc réglable et couleurs, compatible assistants vocaux.", true),
  p("ampoule-tube-t30", "Ampoule tube T30", "ampoules", 18, "#e8b45b", "Verre ambré", 83, "Tube 30 cm à long filament, 6 W."),
  p("guirlande-guinguette", "Guirlande Guinguette 10 m", "exterieur", 49, "#f0d36b", "Caoutchouc", 91, "10 globes LED, IP65, raccordable.", true),
  p("borne-solaire-dune", "Borne solaire Dune", "exterieur", 65, "#4a4f45", "Aluminium", 92, "Recharge solaire, détecteur crépusculaire."),
  p("applique-exterieure-cap", "Applique extérieure Cap", "exterieur", 89, "#2b2b2b", "Fonte d'aluminium", 93, "Éclairage haut/bas pour façade, IP54."),
];

// Produits retirés du catalogue : leurs anciennes URL renvoient une 404,
// parfait pour montrer une règle de redirection vers la catégorie.
export const retiredProducts = [
  { slug: "lampe-arc-milano", legacyId: 70, category: "lampadaires" },
  { slug: "suspension-copenhague", legacyId: 44, category: "suspensions" },
  { slug: "ampoule-halogene-r7s", legacyId: 80, category: "ampoules" },
];

export const posts: Post[] = [
  {
    slug: "choisir-temperature-couleur",
    title: "2700 K, 3000 K, 4000 K : quelle température de couleur choisir ?",
    date: "2026-09-18",
    excerpt: "Salon, cuisine, bureau : le bon blanc pour chaque pièce.",
    legacyWpId: 412,
    body: [
      "La température de couleur se mesure en kelvins. Plus le chiffre est bas, plus la lumière est chaude.",
      "Pour un salon ou une chambre, visez 2700 K. Pour une cuisine ou une salle de bains, 3000 K est un bon compromis. Réservez 4000 K aux espaces de travail.",
      "Une ampoule connectée permet de passer de l'un à l'autre selon le moment de la journée.",
    ],
  },
  {
    slug: "hauteur-suspension-table",
    title: "À quelle hauteur accrocher une suspension au-dessus d'une table ?",
    date: "2026-08-29",
    excerpt: "La règle des 75 cm, et quand s'en écarter.",
    legacyWpId: 398,
    body: [
      "Comptez environ 75 cm entre le plateau et le bas de l'abat-jour.",
      "Pour une table longue, alignez deux ou trois suspensions espacées de 60 à 80 cm.",
      "Sous un plafond très haut, remontez légèrement la suspension pour garder la perspective.",
    ],
  },
  {
    slug: "eclairer-petit-salon",
    title: "Éclairer un petit salon : la méthode des trois points",
    date: "2026-07-10",
    excerpt: "Un éclairage général, un éclairage d'ambiance et une lumière d'appoint.",
    legacyWpId: 377,
    body: [
      "Multipliez les sources plutôt que la puissance : un plafonnier seul écrase les volumes.",
      "Ajoutez une lampe à poser à hauteur d'yeux et une liseuse près du canapé.",
      "Les appliques libèrent le sol quand l'espace manque.",
    ],
  },
  {
    slug: "guide-ampoules-led",
    title: "Lumens, watts, IRC : lire l'étiquette d'une ampoule LED",
    date: "2026-06-02",
    excerpt: "Les trois chiffres qui comptent vraiment.",
    legacyWpId: 351,
    body: [
      "Les lumens indiquent la quantité de lumière, les watts la consommation.",
      "L'IRC (indice de rendu des couleurs) doit être supérieur à 80, idéalement 90 dans une cuisine.",
      "Vérifiez aussi la compatibilité avec votre variateur.",
    ],
  },
  {
    slug: "eclairage-terrasse",
    title: "Éclairer sa terrasse sans éblouir les voisins",
    date: "2026-05-15",
    excerpt: "Guirlandes, bornes solaires et appliques : nos conseils.",
    legacyWpId: 330,
    body: [
      "Orientez la lumière vers le sol et choisissez des sources de 2200 à 2700 K.",
      "Les bornes solaires balisent une allée sans câblage.",
      "Une guirlande guinguette suffit souvent à créer l'ambiance.",
    ],
  },
];

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const findProduct = (slug: string) => products.find((x) => x.slug === slug);
export const productsIn = (category: string) => products.filter((x) => x.category === category);
export const findPost = (slug: string) => posts.find((x) => x.slug === slug);
export const euro = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
