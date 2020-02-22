import apiService from './api-service'

const service = {}
const header = {
  headers: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

service.getProjects = function () {
  return apiService.get('/project')
}

service.postProject = function (project) {
  return apiService.post('/project', project, header)
}

export default service
