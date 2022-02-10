// import { ipcMain } from "electron";
// import { getWallpaper } from "wallpaper";
import { fetchNewImageUrl } from "../../web/src/common/unsplash-api";
//

// ipcMain.on("synchronous-message", (event, arg) => {
//   console.log(arg); // prints "ping"
//   event.returnValue = "heya"; // fetchNewImageUrl(arg);
// });

import("wallpaper").then((module) => {
  console.log("📜 LOG > .then > module", module);
  // Do something with the module.
});

async function changeWallpaper() {
  const module = await import("wallpaper");
  console.log("📜 LOG > changeWallpaper > module", module);
  // const wallpaper = await getWallpaper();
  // console.log("📜 LOG > changeWallpaper > wallpaper", wallpaper);
  // const response = await fetchNewImageUrl();
  // console.log("hmm", response.headers);
}

changeWallpaper();
