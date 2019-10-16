import axios from 'axios'
const isProd = process.env.NODE_ENV === 'production'
const api = {
    url: isProd ? 'https://lit-badlands-54425.herokuapp.com/' : 'localhost:8080'
}

export const $http = axios.create({
    baseURL: isProd ? 'https://lit-badlands-54425.herokuapp.com/' : 'localhost:8080'
})

export default api