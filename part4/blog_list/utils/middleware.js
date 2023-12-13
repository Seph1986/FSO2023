const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestDataMiddleware = (request, response, next) => {
  logger.info('method:', request.method)
  logger.info('path:', request.path)
  logger.info('body:', request.body)
  logger.info('----')
  next()
}

const getToken = (request, response, next) => {
  const authorization = request.headers['authorization']
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  }
  else{
    request.token = null
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken){
    return response.status(401).send({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  request.user = user

  next()
}

const unknownEndPoist = (request, response) => {
  response.status(404).send({ error: 'unknown end point' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestDataMiddleware,
  unknownEndPoist,
  errorHandler,
  getToken,
  userExtractor
}