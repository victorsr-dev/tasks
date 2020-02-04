import apiService from './api-service'

const service = {}
const header = {
  headers: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

service.getUser = function (user) {
  return apiService.post('/login', user, header)
}

export default service
