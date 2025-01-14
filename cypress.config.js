const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries: 0,
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      const deviceConfig = config.env.deviceConfig;
      if (deviceConfig === "phone") {
        config.viewportWidth = 375;
        config.viewportHeight = 812;
      }
      if (deviceConfig === "desktop") {
        config.viewportWidth = 1920;
        config.viewportHeight = 1080;
      }
      return config;
      // implement node event listeners here
    },
  },
});
