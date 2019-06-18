<template>
  <div class="admin">
    <Nav />
    <FirstPage />
  </div>
</template>

<script>
import Nav from '@/components/layout/Nav'
import FirstPage from '@/components/layout/FirstPage'
export default {
  name: 'admin',
  components: {
    Nav,
    FirstPage,
  },
}
</script>
