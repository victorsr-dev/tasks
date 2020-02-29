import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_URL
})

instance.CancelToken = axios.CancelToken
instance.isCancel = axios.isCancel

instance.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    let token = localStorage.getItem('token')
    config.headers['token'] = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error.response)
})

export default instance
