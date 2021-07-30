<template>
  <ul>
    <li v-for="(item, index) in messages" :key="index">{{ item.text }}</li>
  </ul>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const messages = ref([]);

// 1秒请求一次
setInterval(async () => {
  const { data } = await axios.get("/api/room_history");
  messages.value.push(...data.data);
}, 1000);
</script>

<style></style>
