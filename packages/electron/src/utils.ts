import { app } from "electron";

export const isProduction = app.isPackaged;
export const isWindows = process.platform === "win32";
