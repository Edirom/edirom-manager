<template>
<div class="projectManager">
  <button class="btn">Add Project</button>
</div>
</template>

<script>

import io from 'socket.io-client';
console.log(io)
// const socket = io('http://localhost:3000');


export default {
  name: 'ProjectManager',
  mounted () {
    const socket = io('http://localhost:3000')

    // todo: make this flexible
    let repo = '/Users/johannes/Repositories/data'

    this.$store.dispatch('addProject', repo).then(() => {
      // request files of a given repo
      socket.emit('requestFiles', { repo })
    })

    // receiving files of a given repo
    socket.on('fileListing', (data) => {
      this.$store.dispatch('setFiles', data.files)
    })

    // receiving files of a given repo
    socket.on('fileChange', (data) => {

      if(data.operation === 'delete') {
        // console.log('deleted ' + data.path + ' from ' + data.repo)
        this.$store.dispatch('removeFile', data.path )
      } else if(data.operation === 'add') {
        // console.log('added ' + data.path + ' to ' + data.repo)
        this.$store.dispatch('addFile', data.file )
      } else if(data.operation === 'change') {
        // console.log('changed ' + data.path + ' in ' + data.repo)
        this.$store.dispatch('addFile', data.file )
      }

    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.projectManager {
  margin: .1rem;
  border: 1px solid #666666;
  border-radius: 5px;
  padding: .5rem 1rem;
}
</style>
