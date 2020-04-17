import axios from 'axios'
//const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons'
//const baseUrl = 'http://phonebook-nick.herokuapp.com/api/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = (newObject) => {
    return axios
        .post(baseUrl, newObject)
        .then(response => response.data)
}

const deletePerson = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

const updatePerson = (id, newObject) => {
    return axios
        .put(`${baseUrl}/${id}`, newObject)
        .then(response => response.data)
}

export default { getAll, create, deletePerson, updatePerson }