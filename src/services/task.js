import apiService from './api-service'

const service = {}
const header = {
  headers: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

service.getTasks = function () {
  return apiService.get('/task')
}

service.postTask = function (task) {
  return apiService.post('/task', task, header)
}

service.updateTask = function (task) {
  return apiService.put(`/task/${task._id}`, task, header)
}

service.deleteTask = function (task) {
  return apiService.delete(`/task/${task._id}`)
}

export default service
