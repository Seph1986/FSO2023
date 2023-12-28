const { defineConfig } = require('cypress') //eslint-disable-line

module.exports = defineConfig({ //eslint-disable-line
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  env:{
    BACKEND: 'http://localhost:4002/api'
  }
})
