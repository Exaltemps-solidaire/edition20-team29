import { describe, expect, it } from "vitest";
import { etapeCourante } from "./parcours";

describe("etapeCourante", () => {
  it("affiche l'accueil tant qu'aucune entrée n'est choisie", () => {
    expect(etapeCourante(null, null)).toBe("accueil");
  });

  it("affiche l'écran Situation pour l'entrée droits, avant choix de profil", () => {
    expect(etapeCourante("droits", null)).toBe("droits-situation");
  });

  it("affiche la suite du parcours droits une fois un profil choisi", () => {
    expect(etapeCourante("droits", "salariee")).toBe("droits-suite");
  });

  it("affiche l'écran générique pour les autres entrées", () => {
    expect(etapeCourante("perdue", null)).toBe("generique");
    expect(etapeCourante("soignant", null)).toBe("generique");
  });
});
