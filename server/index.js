const Koa = require("koa");

const Router = require("koa-router");

const serve = require("koa-static");

const koaBody = require("koa-body");

const app = new Koa();
const axios = require("axios");

app.use(serve(__dirname + "/static"));

app.use(
  koaBody({
    multipart: true,
  })
);

const router = new Router();
router.get("/", (ctx) => {
  ctx.body = "hello server";
});

router.get("/room", (ctx) => {
  ctx.body = "room";
});

router.get("/room_history", async (ctx) => {
  // 1. 直接发给前端要显示的就可以了
  // 2. 1. 看看是不是已经显示了
  //    2. 两个队列 1个是待显示的 1个是已经显示的
  //       数据过来后先在待显示的里面做 filter， 满足后即可进入显示队列
  // 2. []  <-  1.看看是不是存在的弹幕，
  // 1. websocket  2. 轮询
  // 明天预告， 前端展示 数据
  const { data } = await axios.get(
    "https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory?roomid=21877310"
  );

  ctx.body = {
    state: 1,
    msg: "success",
    data: {
      ...data.data,
    },
  };
});

app.use(router.routes());

app.listen(8080, () => {
  console.log("open server localhost:8080");
});
