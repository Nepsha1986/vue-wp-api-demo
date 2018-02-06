<template>
  <div id="app">
    <tutorial-list></tutorial-list>
  </div>
</template>

<script>
  import TutorialList from './components/TutorialList.vue'

export default {
  name: 'App',
  components: { TutorialList }
}
</script>

<style>
  body {
    position: relative;
  }
</style>
