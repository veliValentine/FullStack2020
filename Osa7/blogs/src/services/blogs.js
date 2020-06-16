import axios from 'axios'

const baseUrl = 'http://localhost:3001/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObj) => {
  const response = await axios.post(baseUrl, blogObj)
  return response.data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

export default {
  getAll,
  create,
  update,
}