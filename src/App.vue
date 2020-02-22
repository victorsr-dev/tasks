<template>
  <div id="app">
    <aside-menu :menu="menu" @menu-click="menuClick"/>
    <router-view/>
  </div>
</template>
<script>
import AsideMenu from '@/components/AsideMenu'
export default {
  name: 'home',
  components: {
    AsideMenu
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
            icon: 'desktop-mac',
            label: 'Tasks'
          },
          {
            to: '/projects',
            icon: 'desktop-mac',
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
