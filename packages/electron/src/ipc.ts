const ipcMain = require("electron").ipcMain;
// import { getWallpaper } from "wallpaper";
// import { fetchNewImageUrl } from "../../web/src/unsplash-api";
const path = require("path");

ipcMain.on("synchronous-message", (event, arg) => {
  console.log(arg);
  event.returnValue = "pong";
});

async function changeWallpaper() {
  const { setWallpaper, getWallpaper } = await import("wallpaper");
  const wallpaper = await getWallpaper();
  console.log("📜 LOG > changeWallpaper > wallpaper", wallpaper);
  const imagepath = path.join(__dirname, "./bg.png");
  try {
    const result = await setWallpaper(imagepath);
    console.log("📜 LOG > changeWallpaper > result", result);
  } catch (err) {
    console.log("📜 LOG > changeWallpaper > err", err);
  }
  console.log("📜 LOG > changeWallpaper > wallpaper", await getWallpaper());
  // console.log("📜 LOG > changeWallpaper > wallpaper", wallpaper);
  // const response = await fetchNewImageUrl();
  // console.log("hmm", response.headers);
}

changeWallpaper();

module.exports = {};
