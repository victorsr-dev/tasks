import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
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
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    setUser (context, user) {
      context.commit('SET_USER', user)
    }
  },
  modules: {
  }
})
