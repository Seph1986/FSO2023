import axios from 'axios'
const baseUrl = '/api/persons'


const getAllPersons = () => {
  const request = axios.get(baseUrl)

  return request.then(res => res.data)
}

const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  
  return request.then(res => res.data)
}

const updatePerson = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
  return request.then(res => res.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res.data)
}


export default { 
  getAllPersons,
   createPerson, 
   deletePerson, 
   updatePerson
  } 