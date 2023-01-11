import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      defaultCommandTimeout: 10000;
      return require("./cypress/plugins/index.js") (on, config);
    },
    baseUrl: "http://localhost:4200",
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },

});
