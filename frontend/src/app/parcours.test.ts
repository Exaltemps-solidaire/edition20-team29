import { describe, expect, it } from "vitest";
import { construireFil, contenuDemarche } from "./parcours";

describe("construireFil", () => {
  it("s'arrête sur les choix d'entrée tant qu'aucune entrée n'est choisie", () => {
    const fil = construireFil(null, null, null);
    expect(fil.at(-1)).toEqual({ type: "choix-entree", cle: "choix-entree" });
  });

  it("propose les étapes une fois le profil choisi, sans effacer l'historique", () => {
    const filAvant = construireFil("droits", null, null);
    const filApres = construireFil("droits", "salariee", null);
    expect(filApres.slice(0, filAvant.length - 1)).toEqual(filAvant.slice(0, -1));
    expect(filApres.at(-1)).toEqual({ type: "choix-etapes", cle: "choix-etapes" });
  });

  it("affiche la checklist et termine par la navigation quand une démarche est choisie", () => {
    const fil = construireFil("droits", "salariee", "ald");
    expect(fil.some((b) => b.type === "checklist" && b.titre === "Check-list · ALD 31")).toBe(true);
    expect(fil.at(-1)).toEqual({ type: "choix-nav", cle: "choix-nav-ald", demarche: "ald" });
  });

  it("mène à l'écran générique pour les autres entrées", () => {
    const fil = construireFil("perdue", null, null);
    expect(fil.at(-1)).toEqual({
      type: "bot",
      cle: "generique",
      texte: "Écran à venir — ce parcours sera construit dans une prochaine itération.",
    });
  });
});

describe("contenuDemarche", () => {
  it("adapte le titre de la checklist « par où commencer » au profil choisi", () => {
    expect(contenuDemarche("rien", "etudiante").checklistTitre).toBe("Check-list · Étudiante");
    expect(contenuDemarche("rien", "salariee").checklistTitre).toBe("Check-list · Salariée secteur privé");
  });

  it("propose un lien vers la médecine du travail seulement depuis RQTH/MDPH", () => {
    expect(contenuDemarche("rqth", "salariee").voirAussiMedecineDuTravail).toBe(true);
    expect(contenuDemarche("ald", "salariee").voirAussiMedecineDuTravail).toBeUndefined();
  });
});
