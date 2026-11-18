export type Entree = "perdue" | "soignant" | "droits";
export type Profil = "salariee" | "etudiante" | "fonctionnaire" | "independante";

export const ENTREES: { id: Entree; icone: string; label: string }[] = [
  { id: "perdue", icone: "🧭", label: "Je viens d'être diagnostiquée et je suis perdue" },
  { id: "soignant", icone: "🗺️", label: "Je cherche un·e soignant·e formé·e près de chez moi" },
  { id: "droits", icone: "⚖️", label: "Je veux faire valoir mes droits (ALD, RQTH…)" },
];

export const PROFILS: { id: Profil; icone: string; label: string }[] = [
  { id: "salariee", icone: "💼", label: "Je suis salariée dans le secteur privé" },
  { id: "etudiante", icone: "🎓", label: "Je suis étudiante" },
  { id: "fonctionnaire", icone: "🏛️", label: "Je suis fonctionnaire" },
  { id: "independante", icone: "🔄", label: "Je suis travailleuse indépendante" },
];

export type Bloc =
  | { type: "bot"; cle: string; texte: string }
  | { type: "user"; cle: string; texte: string }
  | { type: "choix-entree"; cle: string }
  | { type: "choix-profil"; cle: string };

export function construireFil(choix: Entree | null, profil: Profil | null): Bloc[] {
  const fil: Bloc[] = [
    {
      type: "bot",
      cle: "intro",
      texte:
        "Bonjour 👋\n\nJe suis le chatbot d'ENDOmind. Je vous oriente vers les ressources fiables de l'association selon votre situation.\n\nJe ne pose pas de diagnostic et ne remplace pas un·e professionnel·le de santé.",
    },
    { type: "bot", cle: "question-accueil", texte: "Par où souhaitez-vous commencer ?" },
  ];

  if (choix === null) {
    fil.push({ type: "choix-entree", cle: "choix-entree" });
    return fil;
  }

  const entree = ENTREES.find((e) => e.id === choix)!;
  fil.push({ type: "user", cle: "user-entree", texte: entree.label });

  if (choix !== "droits") {
    fil.push({
      type: "bot",
      cle: "generique",
      texte: "Écran à venir — ce parcours sera construit dans une prochaine itération.",
    });
    return fil;
  }

  fil.push({
    type: "bot",
    cle: "droits-intro",
    texte:
      "Vous êtes tout à fait légitime à demander ces aides. ENDOmind a préparé des fiches claires pour vous y aider.\n\nQuelle est votre situation actuelle ?",
  });

  if (profil === null) {
    fil.push({ type: "choix-profil", cle: "choix-profil" });
    return fil;
  }

  const p = PROFILS.find((x) => x.id === profil)!;
  fil.push({ type: "user", cle: "user-profil", texte: p.label });
  fil.push({
    type: "bot",
    cle: "droits-suite",
    texte: "Écran à venir — la suite du parcours droits sera construite dans une prochaine itération.",
  });
  return fil;
}
