<template>
  <div>
     <title-bar :title-stack="titleStack"/>
    <hero-bar :has-right-visible="false">
      {{ title }}
    </hero-bar>
  </div>
</template>
<script>
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'HeaderBar',
  components: {
    TitleBar,
    HeroBar
  },
  props: {
    title: {
      type: String,
      default: 'Not define'
    },
    titleStack: {
      type: Array,
      default: () => []
    }
  }
}
</script>
