export const getTimeState = () => {
  const hours = new Date().getHours();
  if (hours >= 0 && hours <= 10)  return '🍀 早上好!';
  if (hours > 10 && hours <= 14)  return '🌞 中午好!';
  if (hours > 14 && hours <= 18) return '🌻 下午好!';
  if (hours > 18 && hours <= 24)  return '🌝 晚上好!';
  return ''
}

export const formatDate = function (date=new Date(), formatStr='yyyy-MM-dd HH:mm:ss') {
  const o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(), 
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
  };
  if (/(y+)/.test(formatStr)){
    formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o){
    if (new RegExp("(" + k + ")").test(formatStr)){
      formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return formatStr;
}

export const randomAavatar = () => {
  const avatars = ['🐶', '🐱', '🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵' ];
  const randomIndex = Math.floor(Math.random()*avatars.length);
  return avatars[randomIndex];
}

export const splitTime = (v) => {
  v.timeline = v.timeline.split(" ")[1];
  return v;
}
export const addAvatar = v => {
  v.nickname = `${randomAavatar()} ${v.nickname}`;
  return v;
}

let lastTs = 0;
export function getNewMessages(rooms) {
  // 1. 记录最后一个时间戳
  // 2. 后续过来数据的话，只返回比这个时间戳大的数据
  if(!rooms.length) return rooms;

  let result = rooms.filter((item) => {
    return item.check_info.ts > lastTs;
  });

  lastTs = rooms[rooms.length - 1].check_info.ts;

  return result;
}
