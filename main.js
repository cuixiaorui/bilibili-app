const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 390,
    height: 700,
    frame: false,
  });
  win.setOpacity(0.5);
  win.setAlwaysOnTop(true)

  //   const URL = app.isPackaged
  //     ? `file://${join(__dirname, "../render/index.html")}` // vite 构建后的静态文件地址
  //     : `http://localhost:${process.env.PORT}`; // vite 启动的服务器地址

  const URL = `http://localhost:${process.env.PORT}`;

  win?.loadURL(URL);
  //   win.loadFile("./view/dist/index.html");
}

app.whenReady().then(() => {
  createWindow();
});
