/// <reference types="react-scripts" />

interface Window {
  electron: ElectronAPI;
}

interface ElectronAPI {
  notifications: {
    send: (message: string) => void;
  };
  sendImage: (base64Image: string) => void;
}
