const logger = require('./logger')

const requestDataMiddleware = (request, response, next) => {
  logger.info('method:', request.method)
  logger.info('path:', request.path)
  logger.info('body:', request.body)
  logger.info('----')
  next()
}

const unknownEndPoist = (request, response) => {
  response.status(404).send({ error: 'unknown end point' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformated id'})
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestDataMiddleware,
  unknownEndPoist,
  errorHandler
}