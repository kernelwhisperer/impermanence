export function configureIpcMain(ipcMain: Electron.IpcMain) {
  ipcMain.on("synchronous-message", (event, arg) => {
    console.log(arg);
    event.returnValue = "pong";
  });
}

async function changeWallpaper() {
  const wallpaper = await import("wallpaper");
  console.log("📜 LOG > wallpaper", wallpaper);
  console.log(
    "📜 LOG > changeWallpaper > wallpaper",
    await wallpaper.getWallpaper()
  );
}

changeWallpaper();
