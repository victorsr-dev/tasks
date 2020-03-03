<template>
  <div id="app">
    <nav-bar/>
    <aside-menu
      :menu="menu"
      @menu-click="menuClick"/>
    <router-view/>
  </div>
</template>
<script>
import AsideMenu from '@/components/AsideMenu'
import NavBar from '@/components/NavBar'
export default {
  name: 'home',
  components: {
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      return [
        'Menu',
        [
          {
            to: '/main',
            icon: 'desktop-mac',
            label: 'Dashboard'
          },
          {
            to: '/tasks',
            icon: 'calendar-check',
            label: 'Tasks'
          },
          {
            to: '/projects',
            icon: 'folder-outline',
            label: 'Projects'
          }
        ],
        'Settings',
        [
          {
            action: 'dark-mode-toggle',
            label: 'Dark / White',
            icon: 'weather-night',
            updateMark: true
          }
        ]
      ]
    }
  },
  created () {
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: ''
    })
  },
  methods: {
    menuClick (item) {
      if (item.action && item.action === 'dark-mode-toggle') {
        this.$store.commit('darkModeToggle')
      }
    }
  }
}
</script>
