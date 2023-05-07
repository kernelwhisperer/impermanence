import { BrowserWindow, IpcMainEvent, Notification, app } from "electron";
import { mkdir, writeFile } from "node:fs/promises";
import { PaletteMode } from "./preload";

export function configureIpcMain(
  ipcMain: Electron.IpcMain,
  window: BrowserWindow
) {
  ipcMain.on("notify", (_, message: string) => {
    console.log("📜 LOG > ipcMain.on notify > message");
    new Notification({ body: message, title: "Notification" }).show();
  });
  ipcMain.on("set-image", handleSetImage);
  ipcMain.on("set-mode", createSetModeHandler(window));
}

async function handleSetImage(_: IpcMainEvent, base64Image: string) {
  const { setWallpaper } = await import("wallpaper");
  // console.log("📜 LOG > changeWallpaper > wallpaper", await getWallpaper());
  const tempDir = app.getPath("temp");
  console.log("📜 LOG > changeWallpaper > saveDirectory", tempDir);
  const parent = `${tempDir}/impermanence`;
  const filePath = `${parent}/background.png`;
  const data = Buffer.from(base64Image, "base64");
  await mkdir(parent, { recursive: true });
  await writeFile(filePath, data);
  await setWallpaper(filePath);
}

function createSetModeHandler(window: BrowserWindow) {
  const TITLE_BAR_OPTS = {
    dark: {
      color: "#121212",
      symbolColor: "#fff",
    },
    light: {
      color: "#fff",
      symbolColor: "#121212",
    },
  };

  return function handleSetMode(event: IpcMainEvent, mode: PaletteMode) {
    window.setTitleBarOverlay(TITLE_BAR_OPTS[mode]);
    event.returnValue = true;
  };
}
