import trae from 'trae'

const apiService = trae.create({
  baseUrl: process.env.VUE_APP_URL
})

const fullfillMiddleware = (res) => {
  res.data.foo = 'bar'
  return res
}

const rejectMiddleware = (err) => {
  return Promise.reject(err)
}

apiService.after(fullfillMiddleware, rejectMiddleware)

export default apiService
