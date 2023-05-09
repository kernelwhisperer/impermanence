import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";

//
import { configureIpcMain } from "./ipc-main";
import { isProduction, isWindows } from "./utils";

if (!isProduction) {
  const executable = isWindows ? "electron.cmd" : "electron";
  require("electron-reload")(__dirname, {
    electron: path.resolve(__dirname, "../node_modules/.bin", executable),
    forceHardReset: true,
    hardResetMethod: "exit",
  });
}

// Hide the "File Edit View Window Help" submenu
Menu.setApplicationMenu(null);

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    minHeight: 480,
    minWidth: 480,
    titleBarOverlay: {
      color: "#121212",
      symbolColor: "#fff",
    },
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
    width: 800,
  });

  // Load the web app.
  if (isProduction) {
    mainWindow.loadFile("./web-build/index.html");
  } else {
    mainWindow.loadURL("http://localhost:3000");
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const mainWindow = createWindow();
  configureIpcMain(ipcMain, mainWindow);

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
