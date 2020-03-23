<template>
  <div v-if="hasFiles" class="fileSection">
    <h1>{{heading}} <span class="filecount">({{files.length}})</span></h1>
    <table class="table table-striped">
      <thead>
        <th>Name</th>
        <th>Size</th>
        <th>Modified</th>
      </thead>
      <tbody>
        <tr v-for="file in files" v-bind:class="{'active':file.path === activeFilePath()}" :key="file.path" v-on:click="getFileDetails(file.path)">
          <td class="filename">{{file.short}}</td>
          <td class="filesize">{{file.size}}</td>
          <td class="filemod">{{file.modified}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'FileTypeTable',
  props: {
    heading: String,
    hasFiles: Boolean,
    files: Array
  },
  methods: {
    getFileDetails: function(path) {
      this.$store.dispatch('setActiveFile', path)
    },
    activeFilePath: function() {
      return this.$store.getters.activeFilePath
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fileSection {
  margin: 0 0 2rem;
  h1 {
    font-size: .8rem;
    margin: 0;
  }
  table {
    width: calc(100% - 2rem);
    margin: .5rem 0 0 1.5rem;

    th {
      border-bottom-width: 1px;
      padding: .1rem .4rem;
      font-weight: 300;
    }

    tr {
      cursor: pointer;
      &.active {
        font-weight: 500;
        color: red;
      }
    }

    td {
      padding: .1rem .4rem;
      font-weight: 100;

      &.filename {
        width: 50%;
        font-weight: 300;
      }

      &.filesize {
        text-align: right;
      }
    }
  }
}
</style>
