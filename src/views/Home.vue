<template>
  <div class="home">
    <Header />
    <HelloWorld msg="Welcome to CMS" />
  </div>
</template>
<script>
import Header from '@/components/Header'
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    Header,
  },
}
</script>
<style lang="scss" scoped></style>
