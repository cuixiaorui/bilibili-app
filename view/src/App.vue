<template>
  <div>
    hello
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

<script setup>
import axios from "axios";

const { data } = await axios.get("/api/room_history");

console.log(data);

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
  margin-top: 60px;
}
</style>
