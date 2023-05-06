const { ipcRenderer, contextBridge } = require("electron");
console.log(ipcRenderer.sendSync("synchronous-message", "ping"));

contextBridge.exposeInMainWorld("electron", {
  notifications: {
    send(message: string) {
      ipcRenderer.send("notify", message);
    },
  },
  sendImage(base64Image: string) {
    ipcRenderer.send("set-image", base64Image);
  },
});

window.addEventListener("DOMContentLoaded", () => {
  for (const dependency of ["chrome", "node", "electron"]) {
    console.log(`${dependency}-version`, process.versions[dependency]);
  }
});
