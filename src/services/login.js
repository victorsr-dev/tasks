import apiService from './api-service'

const service = {}

service.getUser = function (user) {
  return apiService.post('/login', user)
}

export default service
