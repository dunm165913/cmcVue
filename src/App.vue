<template>
  <div id="app"><router-view></router-view></div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
}
body {
  background-image: aqua;
}
a {
  text-decoration: none;
}
</style>
