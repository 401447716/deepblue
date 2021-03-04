<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import homeRouter from '@/router'

export default {
  name: 'app',
  router: homeRouter
}
</script>

<style lang="scss">
@import "~@/css/base";
html body {
  background-color: #f1f2f4;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
