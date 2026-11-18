export type Entree = "perdue" | "soignant" | "droits";
export type Profil = "salariee" | "etudiante" | "fonctionnaire" | "independante";
export type Etape = "accueil" | "droits-situation" | "droits-suite" | "generique";

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

export function etapeCourante(choix: Entree | null, profil: Profil | null): Etape {
  if (choix === null) return "accueil";
  if (choix === "droits") return profil === null ? "droits-situation" : "droits-suite";
  return "generique";
}
