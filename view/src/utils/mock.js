import { splitTime, addAvatar } from './index'

let mockData = [
  {
    text: "11111",
    nickname: "超人正1正",
    timeline: "2021-07-30 22:53:59",
    check_info: {
      ts: 1627652861,
    },
  },
  {
    text: "超人",
    nickname: "超1",
    timeline: "2021-07-30 22:53:59",
    check_info: {
      ts: 1627652878,
    },
  },
  {
    text: "123123",
    nickname: "vipsasdf12312312",
    timeline: "2021-07-30 22:53:59",
    check_info: {
      ts: 1627652978,
    },
  },
];

export function randomMsg(count) {
  let res = [];
  while (count--) {
    const text = Math.random().toString(16).substring(2, Math.random()*10+5);
    const msg = {
      text,
      nickname: "vip" + Math.random().toString(16).substring(2, Math.random()*10+3),
      timeline: "2021-07-30 22:53:59",
      check_info: {
        ts: new Date().getTime()+ Math.random()*100,
      },
    };
    res.push(msg);
  }
  return res.map(splitTime).map(addAvatar);;
}

export const mockMsgList = mockData.map(splitTime).map(addAvatar);
