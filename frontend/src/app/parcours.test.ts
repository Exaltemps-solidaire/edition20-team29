import { describe, expect, it } from "vitest";
import { construireFil } from "./parcours";

describe("construireFil", () => {
  it("s'arrête sur les choix d'entrée tant qu'aucune entrée n'est choisie", () => {
    const fil = construireFil(null, null);
    expect(fil.at(-1)).toEqual({ type: "choix-entree", cle: "choix-entree" });
  });

  it("ajoute la bulle utilisateur et la question Situation sans retirer l'historique précédent", () => {
    const filAvant = construireFil(null, null);
    const filApres = construireFil("droits", null);
    expect(filApres.slice(0, filAvant.length - 1)).toEqual(filAvant.slice(0, -1));
    expect(filApres.at(-1)).toEqual({ type: "choix-profil", cle: "choix-profil" });
  });

  it("conserve tout le fil jusqu'au choix du profil", () => {
    const fil = construireFil("droits", "salariee");
    const types = fil.map((b) => b.type);
    expect(types).toEqual(["bot", "bot", "user", "bot", "user", "bot"]);
  });

  it("mène à l'écran générique pour les autres entrées", () => {
    const fil = construireFil("perdue", null);
    expect(fil.at(-1)).toEqual({
      type: "bot",
      cle: "generique",
      texte: "Écran à venir — ce parcours sera construit dans une prochaine itération.",
    });
  });
});
