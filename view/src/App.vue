<template>
  <div>
    <Header />
    <div>
      <Barrage></Barrage>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Barrage from "./components/Barrage.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #282d3f;
  color: #8651c9;
  margin: 0;
}
* {
  box-sizing: border-box;
}
button {
  -webkit-app-region: no-drag;
}
</style>
