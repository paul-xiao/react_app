import axios from 'axios'
const api = {
    url: 'http://localhost:8080'
}

export const $http = axios.create({
    baseURL: 'http://localhost:8080'
})

export default api