import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  webServer: {
    command: "npm run dev",  //TAI command: "npm start", 
    url: "http://localhost:3001", //RIIPPUU MISSÄ SE ON ELI VOI OLLA 3000 + vaihda myos test filessa
    timeout: 60000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: true,
  },
});
