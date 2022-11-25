// import { Notification } from "electron";
import { mkdir, writeFile } from "node:fs/promises";
import { app } from "electron";

export function configureIpcMain(ipcMain: Electron.IpcMain) {
  ipcMain.on("synchronous-message", (event, arg) => {
    console.log(arg);
    event.returnValue = "pong";
  });
  ipcMain.on("notify", (_, message: string) => {
    // const wallpaper = await import("wallpaper");
    // await getWallpaper.getWallpaper()
    changeWallpaper(message);
    console.log("📜 LOG > ipcMain.on notify > message");
    // new Notification({ body: message, title: "Notification" }).show();
  });
}

async function changeWallpaper(image: string) {
  const { getWallpaper, setWallpaper } = await import("wallpaper");
  console.log("📜 LOG > changeWallpaper > wallpaper", await getWallpaper());

  const tempDir = app.getPath("temp");
  const parent = `${tempDir}/impermanence`;
  const filePath = `${parent}/background.png`;
  const data = Buffer.from(image, "base64");
  await mkdir(parent, { recursive: true });
  await writeFile(filePath, data);

  console.log("📜 LOG > changeWallpaper > saveDirectory", tempDir);
  console.log(
    "📜 LOG > changeWallpaper > wallpllaper",
    await setWallpaper(filePath)
  );
}
// /usr/share/backgrounds/gnome/adwaita-timed.xml
