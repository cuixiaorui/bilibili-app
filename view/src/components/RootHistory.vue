<template>
  <div class="chat-history">
    <transition-group name="list" tag="div">
      <dl
        class="chat-history__item"
        v-for="item in messages"
        :key="item.check_info.ts"
      >
        <dt class="chat-history__item-name">{{ item.nickname }}</dt>
        <dd class="chat-history__item-text">{{ item.text }}</dd>
        <dd class="chat-history__item-time">{{ item.timeline }}</dd>
      </dl>
    </transition-group>
    <div v-if="!messages.length" style="padding: 30px 0">暂无数据</div>

    <!-- 测试 -->
    <!-- <div>
       <button @click="addMessage(1, 1)">+1-1</button>
      <button @click="addMessage(2, 1)">+2-1</button>
      <button @click="addMessage(2)">+2</button>
      <button @click="addMessage(0, 2)">-2</button>
      <button @click="addMessage(1, 2)">+1-2</button>
    </div> -->
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { splitTime, addAvatar } from "../utils";
import { textToSpeech } from "../utils/textToSpeech";

const LIMIT_SIZE = 15;

// 测试 ---------- S
// import { mockMsgList, randomMsg } from '../utils/mock'
// const messages = ref([...mockMsgList]);
// const addMessage = (add, sub) => {
//   if(add > 0){
//     const randomList = randomMsg(add);
//     messages.value.push(...randomList)
//     messages.value = messages.value.slice(-LIMIT_SIZE);
//   }
//   sub && messages.value.splice(0, sub);
// };
// 测试 ---------- E

const messages = ref([]);
const speechBarrageHandler = speechBarrages();
// 1秒请求一次
setInterval(async () => {
  const { data } = await axios.get("/api/room_history");
  // const info = data.data.map(splitTime).map(addAvatar)
  // console.log(info)
  // textToSpeech("嘿嘿嘿")
  const barrages = data.data.map(splitTime).map(addAvatar);
  // speechBarrages(barrages);
  speechBarrageHandler(barrages);
  messages.value.push(...barrages);
  messages.value.slice(-LIMIT_SIZE);
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
  transition: all 0.8s ease, color 3s ease-out;
  color: #938da1;
  font-size: 14px;
}
.chat-history__item-name {
  width: 25%;
  color: #5cafac;
  text-align: right;
  padding-left: 0.5em;
}
.chat-history__item-text {
  flex: 1;
  text-align: left;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
}
.chat-history__item-time {
  display: none;
  width: 100px;
  color: #6b729d;
  opacity: 0.6;
  text-align: right;
  padding-right: 1em;
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
    display: block;
  }
}
</style>
