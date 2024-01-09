import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async ()=> {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (data) => {
  const request = await axios.post(baseUrl, data)
  return request.data
}

const update = async (data) => {
  const request = await axios.put(`${baseUrl}/${data.id}`, data)
  return request.data
} 

export default { getAll, create, update }