const axios = require("axios");

module.exports = async (ctx) => {
  const { data } = await axios.get(
    "https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory?roomid=21877310"
  );

  ctx.body = {
    state: 1,
    msg: "success",
    data: data.data.room,
  };
};
