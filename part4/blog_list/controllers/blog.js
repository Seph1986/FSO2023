const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)

})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const content = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const blog = new Blog(content)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedData = {
    likes: body.likes
  }

  const data =  await Blog.findByIdAndUpdate(request.params.id, updatedData, { new: true })
  response.json(data)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id

  await Blog.findOneAndDelete(blogId)
  response.status(204).end()
})

module.exports = blogRouter