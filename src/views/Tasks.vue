<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar :has-right-visible="false">
      Tasks
    </hero-bar>
  </div>
</template>
<script>
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'Tasks',
  components: {
    TitleBar,
    HeroBar
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Tasks'
      ]
    }
  }
}
</script>
