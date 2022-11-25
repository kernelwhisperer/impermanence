// const { ipcRenderer } = window.require("electron");

function blobToBase64(blob): Promise<any> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export async function sendBlobToMain(fileName, blob: Blob) {
  const base64 = await blobToBase64(blob);
  // remove "data:mime/type;base64," prefix from data url
  const sanitized = base64.substring(base64.indexOf(",") + 1);
  window.electron.notifications.send(sanitized);

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
