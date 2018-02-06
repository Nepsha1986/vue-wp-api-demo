<template>
  <div id="app">
    <posts-list></posts-list>
  </div>
</template>

<script>
  import PostsList from './components/PostsList.vue'

export default {
  name: 'App',
  components: { PostsList }
}
</script>

<style>
  body {
    position: relative;
  }
</style>
