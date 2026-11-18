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

  await test.step("Je choisis mon profil", async () => {
    await page.getByRole("button", { name: /salariée dans le secteur privé/ }).click();
    await expect(page.getByText("Écran à venir")).toBeVisible();
  });
});
