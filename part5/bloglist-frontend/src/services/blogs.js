import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const findBlogById = async (blogId) => {
  const request = await axios.get(`${baseUrl}/${blogId}`)
  return request.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { authorization: token }
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const updateBlog = async (id, editedBlog) => {
  const config = {
    headers: { authorization: token }
  }

  const request = await axios.put(`${baseUrl}/${id}`, editedBlog, config)
  return request.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { authorization: token }
  }

  const request = await axios.delete(`${baseUrl}/${id}` ,config)
  return request.data
}

export default {
  getAll,
  findBlogById,
  createBlog,
  setToken,
  updateBlog,
  deleteBlog
}