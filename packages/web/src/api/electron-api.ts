// const { ipcRenderer } = window.require("electron");

export async function sendImageToElectron(fileName, base64: string) {
  // remove "data:mime/type;base64," prefix from data url
  const sanitized = base64.substring(base64.indexOf(",") + 1);
  window.electron.sendImage(sanitized);

  // const reader = new FileReader();
  // reader.onload = function () {
  //   if (reader.readyState === 2) {
  //     const buffer = Buffer.from(reader.result as ArrayBuffer);
  //     // ipcRenderer.send("SAVE_FILE", fileName, buffer);
  //     console.log(`Saving ${JSON.stringify({ fileName, size: blob.size })}`);
  //   }
  // };
  // reader.readAsArrayBuffer(blob);
}
