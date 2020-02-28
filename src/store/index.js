import Vue from 'vue'
import Vuex from 'vuex'
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
    isNavBarVisible: true,

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
        document.documentElement.classList.add('has-aside-left', 'has-aside-mobile-transition', 'has-navbar-fixed-top', 'has-aside-expanded')
      } else {
        document.documentElement.classList.remove('has-aside-left', 'has-aside-mobile-transition', 'has-navbar-fixed-top', 'has-aside-expanded')
      }

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
      state.user = user
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
        const { user, token } = res.data
        localStorage.setItem('token', token)
        context.commit('AUTH_SUCCESS', user, token)
      })
    },
    getProjects (context) {
      return ProjectService.getProjects().then(res => {
        context.commit('SET_PROJECTS', res.data.projects)
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
        console.log(res)
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
