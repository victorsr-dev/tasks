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
        'General',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Dashboard'
          }
        ],
        'Examples',
        [
          {
            action: 'dark-mode-toggle',
            label: 'Dark / White',
            icon: 'weather-night'
          },
          {
            to: '/tables',
            label: 'Tables',
            icon: 'table',
            updateMark: true
          },
          {
            to: '/forms',
            label: 'Forms',
            icon: 'square-edit-outline'
          },
          {
            to: '/profile',
            label: 'Profile',
            icon: 'account-circle'
          },
          {
            label: 'Submenus',
            subLabel: 'Submenus Example',
            icon: 'view-list',
            menu: [
              {
                href: '#void',
                label: 'Sub-item One'
              },
              {
                href: '#void',
                label: 'Sub-item Two'
              }
            ]
          }
        ],
        'About',
        [
          {
            href: 'https://admin-null.justboil.me',
            label: 'Premium Demo',
            icon: 'credit-card'
          },
          {
            href: 'https://justboil.me/bulma-admin-template/null',
            label: 'About',
            icon: 'help-circle'
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
