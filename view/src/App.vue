<template>
  <div>
    <Header />
    <div>
      <RootHistory></RootHistory>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import RootHistory from "./components/RootHistory.vue";
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
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
  background: #282D3F; 
  color:#8651C9; 
  margin: 0; 
}
* { 
  box-sizing: border-box;
}
button {
  -webkit-app-region: no-drag;
}
</style>
