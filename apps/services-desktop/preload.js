// Bridges the sandboxed pages to the main process.
// - LicenseAPI: used by the activation screen (license/gate.html).
// - OpticalShopDesktop: a flag so the app can tell it runs as a desktop app.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("LicenseAPI", {
  status: () => ipcRenderer.invoke("license:status"),
  activate: (code) => ipcRenderer.invoke("license:activate", code),
  open: () => ipcRenderer.invoke("license:open"),
});

contextBridge.exposeInMainWorld("OpticalShopDesktop", { platform: process.platform, isDesktop: true });
