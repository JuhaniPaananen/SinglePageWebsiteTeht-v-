import { test, expect } from "@playwright/test";

test("Loads the homepage", async ({ page }) => {
  await page.goto("http://localhost:3001"); //RIIPPUU MISSÄ SE ON ELI VOI OLLA 3000
  await expect(page).toHaveTitle(/React App/);
});