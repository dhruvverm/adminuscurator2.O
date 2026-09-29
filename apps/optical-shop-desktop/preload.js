// Intentionally minimal: the app is a normal web page and needs no Node.js access.
// Exposes only a flag so the app could detect it is running as a desktop app.
const { contextBridge } = require("electron");
contextBridge.exposeInMainWorld("OpticalShopDesktop", { platform: process.platform, isDesktop: true });
