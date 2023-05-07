import { PaletteMode } from "@mui/material";

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

interface ElectronAPI {
  notifications: {
    send: (message: string) => void;
  };
  sendImage: (base64Image: string) => Promise<void>;
  setMode: (mode: PaletteMode) => boolean;
}

export async function sendImageToElectron(fileName, base64: string) {
  // remove "data:mime/type;base64," prefix from data url
  const sanitized = base64.substring(base64.indexOf(",") + 1);
  await window.electron?.sendImage(sanitized);
}

export const setElectronMode = window.electron?.setMode;
