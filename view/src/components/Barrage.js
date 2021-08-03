import axios from "axios";
import { splitTime, addAvatar } from "../utils";
import { textToSpeech } from "../utils/textToSpeech";

export const getBarrages = async () => {
  const { data } = await axios.get("/api/room_history");
  const result = getNewMessages(data.data).map(splitTime).map(addAvatar);
  return result;
};

let lastTs = 0;
function getNewMessages(rooms) {
  // 1. 记录最后一个时间戳
  // 2. 后续过来数据的话，只返回比这个时间戳大的数据
  if (!rooms.length) return rooms;

  let result = rooms.filter((item) => {
    return item.check_info.ts > lastTs;
  });

  lastTs = rooms[rooms.length - 1].check_info.ts;

  return result;
}

let isFirst = true;
const speechHandler = _speechContents();
export function speechContents(contents) {
  if (isFirst) {
    isFirst = false;
    return;
  }
  speechHandler(contents);
}

function _speechContents() {
  const list = [];
  return async (contents) => {
    list.push(...contents);
    for (const barrage of list) {
      list.shift();
      await textToSpeech(barrage.text);
    }
  };
}
