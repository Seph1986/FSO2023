const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
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

test('bad request expected', async () => {
  const request = {
    author: 'testing',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(request)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})