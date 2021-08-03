<template>
  <div class="chat-history">
    <transition-group name="list" tag="div">
      <dl
        class="chat-history__item"
        v-for="item in messages"
        :key="item.check_info.ts"
      >
        <dt class="chat-history__item-name">{{ item.nickname }}</dt>
        <dd class="chat-history__item-text">: {{ item.text }}</dd>
        <dd class="chat-history__item-time">{{ item.timeline }}</dd>
      </dl>
    </transition-group>
    <div v-if="!messages.length" style="padding: 30px 0">暂无数据</div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { splitTime, addAvatar, getNewMessages } from "../utils";
import { textToSpeech } from "../utils/textToSpeech";

const LIMIT_SIZE = 15;

const messages = ref([]);
const speechBarrageHandler = speechBarrages();
// 1秒请求一次
let isFirst = true;
setInterval(async () => {
  const { data } = await axios.get("/api/room_history");
  const barrages = getNewMessages(data.data).map(splitTime).map(addAvatar);
  console.log(...barrages);
  if (!isFirst) {
    speechBarrageHandler(barrages);
  }

  isFirst = false;
  messages.value.push(...barrages);
  messages.value.slice(-LIMIT_SIZE);
  window.scrollTo(0, document.body.scrollHeight);
}, 1000);

function speechBarrages() {
  const list = [];
  return async (barrages) => {
    list.push(...barrages);
    for (const barrage of list) {
      list.shift();
      await textToSpeech(barrage.text);
    }
  };
}
</script>

<style>
.chat-history__item {
  display: flex;
  align-items: flex-start;
  margin: 1em 0;
  padding-right: 1em;
  transition: all 0.8s ease, color 3s ease-out;
  color: #938da1;
  font-size: 14px;
}
.chat-history__item-name {
  width: 30%;
  color: #5cafac;
  text-align: right;
  padding-left: 0.5em;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chat-history__item-text {
  flex: 1;
  text-align: left;
  margin-left: 6px;
  font-size: 16px;
  font-weight: 500;
}
.chat-history__item-time {
  display: none;
  width: 100px;
  color: #6b729d;
  opacity: 0.6;
  text-align: right;
}

.list-enter-from {
  opacity: 0;
  color: #6523ff;
  transform: translateY(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

@media (min-width: 400px) {
  .chat-history__item-time {
    display: contents;
  }
}
</style>
