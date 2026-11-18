import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois l'écran d'accueil et ses trois entrées", async () => {
    await expect(page.getByText("suis perdue")).toBeVisible();
    await expect(page.getByText("soignant")).toBeVisible();
    await expect(page.getByRole("button", { name: /faire valoir mes droits/ })).toBeVisible();
  });

  await test.step("Je choisis « faire valoir mes droits » et je vois l'écran Situation", async () => {
    await page.getByRole("button", { name: /faire valoir mes droits/ }).click();
    await expect(page.getByText("Quelle est votre situation actuelle")).toBeVisible();
    await expect(page.getByRole("button", { name: /salariée dans le secteur privé/ })).toBeVisible();
  });

  await test.step("Je choisis mon profil et je vois la question des étapes déjà réalisées", async () => {
    await page.getByRole("button", { name: /salariée dans le secteur privé/ }).click();
    await expect(page.getByText("Qu'avez-vous déjà fait")).toBeVisible();
  });

  await test.step("Je choisis « par où commencer » et je vois la checklist et les fiches ENDOmind", async () => {
    await page.getByRole("button", { name: /par où commencer/ }).click();
    await expect(page.getByText("Fiche ALD 31 · Endométriose")).toBeVisible();
    await expect(page.getByText("Check-list · Salariée secteur privé")).toBeVisible();
  });

  await test.step("Je reviens à l'accueil", async () => {
    await page.getByRole("button", { name: /Revenir à l'accueil/ }).click();
    await expect(page.getByRole("button", { name: /faire valoir mes droits/ })).toBeVisible();
  });

  await test.step("Même sur un écran pas encore construit, je peux revenir à l'accueil", async () => {
    await page.getByText("suis perdue").click();
    await expect(page.getByText("Écran à venir")).toBeVisible();
    await page.getByRole("button", { name: /Revenir à l'accueil/ }).click();
    await expect(page.getByRole("button", { name: /faire valoir mes droits/ })).toBeVisible();
  });
});
