// 写个脚本去测试一下

const axios = require("axios");

(async () => {
  const { data } = await axios.get(
    "https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory?roomid=21877310"
  );
  console.log(data.data.room);
})();
