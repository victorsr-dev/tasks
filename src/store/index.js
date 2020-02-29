import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import ProjectService from '../services/project'
import TaskService from '../services/task'
import LoginService from '../services/login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: {},
    projects: [],
    tasks: [],
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,
    /* NavBar */
    isNavBarVisible: false,

    /* FooterBar */
    isFooterBarVisible: true,

    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false,

    /* Dark mode */
    isDarkModeActive: false
  },
  mutations: {
    basic (state, payload) {
      state[payload.key] = payload.value
    },
    /* User */
    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    },

    /* Aside Mobile */
    asideMobileStateToggle (state, payload = null) {
      let isShow

      if (payload !== null) {
        isShow = payload
      } else {
        isShow = !state.isAsideMobileExpanded
      }
      if (isShow) {
        document.documentElement.classList.add('has-aside-left', 'has-aside-mobile-transition', 'has-navbar-fixed-top', 'has-aside-expanded', 'has-aside-mobile-expanded')
      } else {
        document.documentElement.classList.remove('has-aside-left', 'has-aside-mobile-transition', 'has-navbar-fixed-top', 'has-aside-expanded', 'has-aside-mobile-expanded')
      }
      console.log(document)
      state.isAsideMobileExpanded = isShow
    },

    /* Dark Mode */
    darkModeToggle (state, payload = null) {
      const htmlClassName = 'is-dark-mode-active'

      state.isDarkModeActive = !state.isDarkModeActive

      if (state.isDarkModeActive) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove(htmlClassName)
      }
    },

    AUTH_SUCCESS (state, user) {
      console.log('Usuario: ', user)
      state.user = user
      state.token = localStorage.getItem('token')
      state.isNavBarVisible = true
    },
    LOGOUT_SUCCESS (state) {
      state.user = {}
      state.token = ''
      state.isNavBarVisible = false
    },
    SET_PROJECTS (state, projects) {
      state.projects = projects
    },

    ADD_PROJECT (state, project) {
      state.projects.push(project)
    },

    REMOVE_PROJECT (state, project) {
      let index = state.projects.findIndex(p => p._id === project._id)
      state.projects.splice(index, 1)
    },

    SET_TASKS (state, tasks) {
      state.tasks = tasks
    },

    ADD_TASK (state, task) {
      const project = state.projects.find(p => p._id === task.project)
      task.project = project
      state.tasks.push(task)
    }
  },
  actions: {
    setUser (context, user) {
      context.commit('SET_USER', user)
    },
    login (context, user) {
      return LoginService.getUser(user).then(res => {
        console.log(res)
        const { user, token } = res.data
        localStorage.setItem('token', token)
        context.commit('AUTH_SUCCESS', user)
      })
    },
    logout (context) {
      localStorage.removeItem('token')
      context.commit('LOGOUT_SUCCESS')
    },
    getProjects (context) {
      return ProjectService.getProjects().then(res => {
        context.commit('SET_PROJECTS', res.data.projects)
      }).catch(err => {
        handleErrorRequest(err)
      })
    },
    createProject (context, project) {
      return ProjectService.postProject(project).then(res => {
        context.commit('ADD_PROJECT', res.data.project)
      })
    },
    deleteProject (context, project) {
      return ProjectService.deleteProject(project).then(res => {
        context.commit('REMOVE_PROJECT', res.data.project)
      }).catch(err => {
        console.log(err)
      })
    },
    getTasks (context) {
      return TaskService.getTasks().then(res => {
        context.commit('SET_TASKS', res.data.tasks)
      }).catch(err => {
        console.log(err)
      })
    },
    createTask (context, task) {
      return TaskService.postTask(task).then(res => {
        context.commit('ADD_TASK', res.data.task)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  getters: {
    projects: state => state.projects,
    tasks: state => state.tasks,
    user: state => state.user,
    isLoggedIn: state => !!state.token
  },
  modules: {
  }
})

function handleErrorRequest (err) {
  if (err.status === 401) {
    router.push({ name: 'Login' })
    
  }
}
