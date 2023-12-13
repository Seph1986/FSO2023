require('express-async-errors')
// LOCAL MODULES
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const blogMiddlewares = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
// EXTERNAL MODULES
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')


// MongoDB CONECTION
console.log('Conecting to', config.BLOG_URL)
mongoose.connect(config.BLOG_URL)
  .then(res => logger.info('conected to MongoDB')) //eslint-disable-line
  .catch(err => logger.error('error: ', err.message))


const app = express()

app.use(cors())
app.use(express.json())
app.use(blogMiddlewares.requestDataMiddleware)
app.use(blogMiddlewares.getToken)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(blogMiddlewares.unknownEndPoist)
app.use(blogMiddlewares.errorHandler)

module.exports = app

