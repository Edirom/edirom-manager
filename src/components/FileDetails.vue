<template>
<div class="fileDetails" v-if="file !== null">
  {{file}}
  <h1>Details: {{file.short}}</h1>
  <div v-if="file.category === 'MEI'">
    MEI file <small>(last modification: {{file.modified}})</small>
    <table class="table">
      <tbody>
        <tr><td>Root element:</td><td>{{file.root}}</td></tr>
        <tr><td># of mdivs:</td><td>{{file.mdivs}}</td></tr>
        <tr><td># of measures:</td><td>{{file.measures}}</td></tr>
        <tr><td># of measure zones:</td><td>{{file.zones}}</td></tr>
        <tr><td># of surfaces:</td><td>{{file.pages}}</td></tr>
        <tr><td>has music:</td><td>{{file.music}}</td></tr>
      </tbody>
    </table>
  </div>
  <div v-if="file.category === 'TEI'">
    TEI file
  </div>
  <div v-if="file.category === 'img'">
    Image

    {{file}}
  </div>
  <div v-if="file.category === 'other'">
    Other file

    {{file}}
  </div>
  <div v-if="file.category === 'SVG'">
    SVG file

    {{file}}
  </div>
</div>
</template>

<script>

export default {
  name: 'FileDetails',
  computed: {
    file: function() {
      return this.$store.getters.activeFile
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fileDetails {
  margin: .5rem .1rem .1rem;
  border: 1px solid #666666;
  border-radius: 5px;
  padding: .5rem 1rem;

  h1 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 .1rem;
  }

  table {
    margin: 0 1rem;
    font-weight: 300;
    font-size: .7rem;
    width: calc(100% - 2rem);

    td {
      padding: 0;
    }
  }
}
</style>
