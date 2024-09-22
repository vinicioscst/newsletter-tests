const dotenvPlugin = require('cypress-dotenv')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config = dotenvPlugin(config)
      return config
    }
  }
})
