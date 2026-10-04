// Bridges the sandboxed pages to the main process.
// - LicenseAPI: used by the activation screen (license/gate.html).
// - OpticalShopDesktop: a flag so the app can tell it runs as a desktop app.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("LicenseAPI", {
  status: () => ipcRenderer.invoke("license:status"),
  activate: (code) => ipcRenderer.invoke("license:activate", code),
  open: () => ipcRenderer.invoke("license:open"),
});

// Ask the main process which edition the active licence grants, so the app
// can show the Online (WhatsApp) features. Synchronous so it is ready before
// the app's own scripts run.
let edition = null;
try { edition = ipcRenderer.sendSync("license:edition-sync"); } catch (e) {}

contextBridge.exposeInMainWorld("OpticalShopDesktop", { platform: process.platform, isDesktop: true, edition: edition });
