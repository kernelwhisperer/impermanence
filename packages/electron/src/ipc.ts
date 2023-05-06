import { Notification, app } from "electron";
import { mkdir, writeFile } from "node:fs/promises";

export function configureIpcMain(ipcMain: Electron.IpcMain) {
  ipcMain.on("synchronous-message", (event, arg) => {
    console.log(arg);
    event.returnValue = "pong";
  });
  ipcMain.on("notify", (_, message: string) => {
    console.log("📜 LOG > ipcMain.on notify > message");
    new Notification({ body: message, title: "Notification" }).show();
  });
  ipcMain.on("set-image", (_, base64Image: string) => {
    changeWallpaper(base64Image);
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
    "📜 LOG > changeWallpaper > wallpaper",
    await setWallpaper(filePath)
  );
}
