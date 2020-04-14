import axios from 'axios'
const baseUrl = 'http://api.weatherstack.com'
const api_key = process.env.REACT_APP_API_KEY

const getByName = (name) => {
    const request = axios.get(`${baseUrl}/current?access_key=${api_key}&query=${name}`)
    return request.then(response => response.data)
}

export default {getByName}