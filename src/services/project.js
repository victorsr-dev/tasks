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

service.deleteProject = function (project) {
  return apiService.delete(`/project/${project._id}`)
}

export default service
