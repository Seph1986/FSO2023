const app = require('./app') // la aplicación Express real
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

http.createServer(app)

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})