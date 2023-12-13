const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs', { url:1, title:1, author:1, id:1 })

  response.json(allUsers)
})

userRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    return response.status(400).send({
      error: 'password minimum length 3'
    })
  }

  const saltRound = 10
  const passwordHash = await bcrypt.hash(body.password, saltRound)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await newUser.save()

  response.json(savedUser)
})

module.exports = userRouter