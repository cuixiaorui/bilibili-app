<template>
    <div class="main-header">
      <div class="main-header-tip">{{ timeState }}</div>
      <div class="main-header-time">{{ timeStr }}</div>
    </div>
</template>
<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { getTimeState, formatDate} from '../utils'

let timer = null;

const timeState = getTimeState();
const time = formatDate()

const timeStr = ref(time);

timer = setInterval(() => {
  timeStr.value = formatDate();
}, 1000)

onBeforeUnmount(()=>{
  timer && clearInterval(timer);
})
</script>

<style>
.main-header {
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.main-header-tip {
  font-size: 36px;
  color: #99BF70;
}
.main-header-time {
  font-size: 16px;
  color: #6B729D;
}
</style>