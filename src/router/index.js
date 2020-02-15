import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Main from '../views/Main.vue'
import Tasks from '../views/Tasks.vue'
import Projects from '../views/Projects.vue'

import store from '../store/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Home
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.afterEach((to, from, next) => {
  if (to.name === 'Login') {
    store.commit('asideMobileStateToggle', false)
  } else {
    store.commit('asideMobileStateToggle', true)
  }
})

export default router
