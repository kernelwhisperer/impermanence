const { ipcRenderer, contextBridge } = require("electron");
console.log(ipcRenderer.sendSync("synchronous-message", "ping"));

contextBridge.exposeInMainWorld("electron", {
  notifications: {
    send(message: string) {
      ipcRenderer.send("notify", message);
    },
  },
});

window.addEventListener("DOMContentLoaded", () => {
  for (const dependency of ["chrome", "node", "electron"]) {
    console.log(`${dependency}-version`, process.versions[dependency]);
  }
});
