const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  let blogs = helper.blogsList
    .map(blog => new Blog(blog))
  let promises = blogs.map(blog => blog.save())
  Promise.all(promises)

})

test('fetching list of blogs', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.blogsList.length)
})

test('does not have _id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0]._id).not.toBeDefined()
})

test('request without likes parameter', async () => {
  const request = {
    title: 'Eating, why its necesary ?',
    author: 'Jose W.',
    url: 'jose.com'
  }

  const response = await api.post('/api/blogs').send(request)
  const data = response.body

  expect(data.likes).toEqual(0)
})

test('notes bad request expected', async () => {
  const request = {
    author: 'testing',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(request)
    .expect(400)
})

beforeEach(async () => {
  await User.deleteMany({})

  // ADD BYCRYPT TO THE NEW USERS
  let usersPromises = helper.initialUsers
    .map((user) => new User(user))
  let promises = usersPromises
    .map((promise) => promise.save())
  await Promise.all(promises)
})

describe('trying to creat invalid users', () => {
  test('already created user', async () => {
    const myUser = helper.initialUsers[0]

    const newUser = {
      username: myUser.username,
      name: 'Juan',
      password: 'shellnotpass'
    }

    const result = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('`username` to be unique')
  })
  test('short username', async () => {
    const badUsername = {
      username: 'ju',
      name: 'Juan',
      password: 'fromparaguay'
    }

    const result = await api
      .post('/api/users/')
      .send(badUsername)
      .expect(400)

    const regex = /name: Path `username` .* shorter than the minimum allowed length \(3\)\./
    expect(result.body.error).toMatch(regex)
  })
  test('short name', async () => {
    const badName = {
      username: 'juan13',
      name: 'Ju',
      password: 'fromparaguay'
    }

    const result = await api
      .post('/api/users/')
      .send(badName)
      .expect(400)

    const regex = /name: Path `name` .* shorter than the minimum allowed length \(3\)\./
    expect(result.body.error)
      .toMatch(regex)
  })
  test('short password', async () => {
    const badPassword = {
      username: 'juan123',
      name: 'Juan',
      password: 'jo'
    }

    const result = await api
      .post('/api/users/')
      .send(badPassword)
      .expect(400)

    expect(result.body.error)
      .toContain('password minimum length 3')
  })
})


afterAll(() => {
  mongoose.connection.close()
})