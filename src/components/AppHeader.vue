<template>
<header class="navbar">
  <section class="navbar-section">
    <img class="vifeLogo" alt="Edirom" src="../assets/vife-logo.png">
    <a href="..." class="btn btn-link">Docs</a>
    <a href="..." class="btn btn-link">GitHub</a>
  </section>
  <section class="navbar-section">
    Edirom Manager
  </section>
  <section class="navbar-section">
    <!--<div class="input-group input-inline">
      <input class="form-input" type="text" placeholder="search">
      <button class="btn btn-primary input-group-btn">Search</button>
    </div>-->
  </section>
</header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vifeLogo {
  width: 5em;
  margin: 0 0 0 3em;
}
</style>
