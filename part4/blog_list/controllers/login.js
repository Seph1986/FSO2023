const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jsw = require('jsonwebtoken')

loginRouter.post('/', async(request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCheck = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if(!(user && passwordCheck)){
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userData = {
    id: user._id,
    username: user.username
  }

  const token = jsw.sign(userData, process.env.SECRET)

  response.status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter