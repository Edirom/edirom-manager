<template>
  <div id="app">
    <AppHeader/>
    <div class="container">
      <div class="columns">
        <div class="column col-8">
          <FileListing/>
        </div>
        <div class="column col-4">
          <ProjectManager/>
          <FileDetails v-if="activeFile !== null"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import ProjectManager from './components/ProjectManager.vue'
import FileListing from './components/FileListing.vue'
import FileDetails from './components/FileDetails.vue'

export default {
  name: 'app',
  components: {
    AppHeader,
    ProjectManager,
    FileListing,
    FileDetails
  },
  computed: {
    activeFile: function() {
      return this.$store.getters.activeFile
    }
  }
}
</script>

<style lang="scss">
#app {

}
</style>
