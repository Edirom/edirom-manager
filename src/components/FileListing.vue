<template>
<div class="fileListing">
  <FileTypeTable :heading="'MEI Files'" :hasFiles="showMei" :files="meiFiles"/>
  <FileTypeTable :heading="'TEI Files'" :hasFiles="showTei" :files="teiFiles"/>
  <FileTypeTable :heading="'SVG Files'" :hasFiles="showSvg" :files="svgFiles"/>
  <FileTypeTable :heading="'Image Files'" :hasFiles="showImg" :files="imgFiles"/>
  <FileTypeTable :heading="'Other Files'" :hasFiles="showOther" :files="otherFiles"/>
</div>
</template>

<script>

import FileTypeTable from './FileTypeTable.vue'

export default {
  name: 'FileListing',
  components: {
    FileTypeTable
  },
  computed: {
    files: function() {
      return this.$store.getters.files
    },
    showMei: function() {
      return this.$store.getters.meiFiles.length > 0
    },
    meiFiles: function() {
      return this.$store.getters.meiFiles
    },
    showTei: function() {
      return this.$store.getters.teiFiles.length > 0
    },
    teiFiles: function() {
      return this.$store.getters.teiFiles
    },
    showSvg: function() {
      return this.$store.getters.svgFiles.length > 0
    },
    svgFiles: function() {
      return this.$store.getters.svgFiles
    },
    showImg: function() {
      return this.$store.getters.imgFiles.length > 0
    },
    imgFiles: function() {
      return this.$store.getters.imgFiles
    },
    showOther: function() {
      return this.$store.getters.otherFiles.length > 0
    },
    otherFiles: function() {
      return this.$store.getters.otherFiles
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fileSection {
  margin: 0 0 3rem;
  h1 {
    font-size: .8rem;
    margin: 0;
  }
  table {
    width: calc(100% - 2rem);
    margin: 0 0 0 2rem;

    th {
      border-bottom-width: 1px;
      padding: .1rem .4rem;
      font-weight: 300;
    }

    td {
      padding: .1rem .4rem;
      font-weight: 100;
    }
  }
}
</style>
