const { ipcRenderer, contextBridge } = require("electron");
export type PaletteMode = "light" | "dark";

contextBridge.exposeInMainWorld("electron", {
  notifications: {
    send(message: string) {
      ipcRenderer.send("notify", message);
    },
  },
  async sendImage(base64Image: string) {
    ipcRenderer.send("set-image", base64Image);
  },
  setMode(mode: PaletteMode) {
    ipcRenderer.sendSync("set-mode", mode);
  },
});

window.addEventListener("DOMContentLoaded", () => {
  for (const dependency of ["chrome", "node", "electron"]) {
    console.log(`${dependency}-version`, process.versions[dependency]);
  }
});
