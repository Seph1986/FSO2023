const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

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


blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user


  const content = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await content.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  await savedBlog.populate('user', { username: 1, name: 1, id: 1 })

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const blog = request.body

  const data = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(data)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogId = request.params.id
  const user = request.user
  const blog = await Blog.findById(blogId)

  if (!user || !blog) {
    return response.status(401).send({ error: 'something went wrong..' })
  }

  if (blog.user.toString() === user._id.toString()) {
    const newList = user.blogs.reduce((acc, objId) => {
      if (objId.toString() !== blog._id.toString()) {
        acc.push(objId)
      }
      return acc
    }, [])

    user.blogs = newList
    await user.save()

    await Blog.findByIdAndDelete(blogId)
    response.status(204).end()
  } else {
    response.status(401).send({ error: 'bad request' })
  }
})

module.exports = blogRouter