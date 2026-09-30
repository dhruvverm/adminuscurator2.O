/**
 * Optical Shop Manager — desktop shell.
 * Loads the offline single-file app (app/index.html) in a secure window and
 * provides native printing, file saving and external links. Data (IndexedDB,
 * localStorage) is kept in the app's own user-data folder and persists
 * across updates.
 */
const { app, BrowserWindow, Menu, dialog, shell, session, ipcMain } = require("electron");
const path = require("node:path");
const license = require("./license/manager");

const APP_NAME = "Adminuscurator Retail";
const INDEX = path.join(__dirname, "app", "index.html");
const GATE = path.join(__dirname, "license", "gate.html");
const SMOKE = process.env.SMOKE_TEST === "1";

app.setName(APP_NAME);
license.setPath(app.getPath("userData"));

// The activation screen talks to the licence check here in the main process.
ipcMain.handle("license:status", () => license.status());
ipcMain.handle("license:activate", (_e, code) => license.activate(code));
ipcMain.handle("license:open", () => {
  if (license.status().state === "active" && win) win.loadFile(INDEX);
});

// One running copy only — two windows writing the same database could conflict.
if (!SMOKE && !app.requestSingleInstanceLock()) {
  app.quit();
}

let win = null;

function isAppUrl(url) {
  return url.startsWith("file://") && decodeURIComponent(url).includes(path.join("app", "index.html").replace(/\\/g, "/"));
}

function openExternally(url) {
  if (/^(https?|mailto|tel|whatsapp):/i.test(url)) shell.openExternal(url);
}

function createWindow() {
  win = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 960,
    minHeight: 640,
    title: APP_NAME,
    backgroundColor: "#ffffff",
    show: false,
    autoHideMenuBar: process.platform === "win32",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true,
    },
  });

  win.once("ready-to-show", () => {
    if (!SMOKE) win.show();
  });

  // WhatsApp and other web links open in the user's browser / apps.
  win.webContents.setWindowOpenHandler(({ url }) => {
    openExternally(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (event, url) => {
    if (!isAppUrl(url)) {
      event.preventDefault();
      openExternally(url);
    }
  });

  // Show the app only while the licence is active; otherwise the activation screen.
  // (The smoke test bypasses the gate so it can check the app itself.)
  const unlocked = SMOKE || license.status().state === "active";
  win.loadFile(unlocked ? INDEX : GATE);

  // While the app is open, lock it the moment the 7 days run out.
  if (!SMOKE) {
    const timer = setInterval(() => {
      if (!win || win.isDestroyed()) return;
      const onApp = win.webContents.getURL().includes("/app/");
      if (onApp && license.status().state !== "active") win.loadFile(GATE);
    }, 60 * 1000);
    win.on("closed", () => clearInterval(timer));
  }

  return win;
}

function configureSession() {
  const ses = session.defaultSession;

  // Files the app "downloads" (backups, invoices, CSV) → native Save dialog.
  ses.on("will-download", (_event, item) => {
    item.setSaveDialogOptions({
      title: "Save file",
      defaultPath: path.join(app.getPath("downloads"), item.getFilename()),
    });
  });

  // Allow the features the app uses (backup folder, clipboard, notifications); deny the rest.
  const allowed = new Set(["fileSystem", "clipboard-read", "clipboard-sanitized-write", "notifications", "persistent-storage"]);
  ses.setPermissionRequestHandler((_wc, permission, callback) => callback(allowed.has(permission)));
  ses.setPermissionCheckHandler((_wc, permission) => allowed.has(permission));
}

function buildMenu() {
  const isMac = process.platform === "darwin";
  const template = [
    ...(isMac ? [{ role: "appMenu" }] : []),
    { role: "fileMenu" },
    { role: "editMenu" },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    { role: "windowMenu" },
    {
      role: "help",
      submenu: [
        {
          label: "Open data folder",
          click: () => shell.openPath(app.getPath("userData")),
        },
        {
          label: `About ${APP_NAME}`,
          click: () =>
            dialog.showMessageBox({
              type: "info",
              title: APP_NAME,
              message: `${APP_NAME} ${app.getVersion()}`,
              detail:
                "Works fully offline. Your data is stored only on this computer.\nRemember to take regular backups from Backup & Restore.",
            }),
        },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.whenReady().then(() => {
  configureSession();
  buildMenu();
  const w = createWindow();

  if (SMOKE) {
    // CI/local check: the app loads, storage works, then exit.
    w.webContents.once("did-finish-load", async () => {
      try {
        const result = await w.webContents.executeJavaScript(`new Promise((resolve) => {
          setTimeout(() => {
            const r = indexedDB.open("__smoke", 1);
            r.onsuccess = () => resolve({ title: document.title, idb: true, fsAccess: typeof showDirectoryPicker === "function", bodyText: document.body.innerText.length });
            r.onerror = () => resolve({ title: document.title, idb: false });
          }, 1500);
        })`);
        console.log("SMOKE_RESULT " + JSON.stringify(result));
        app.exit(result.idb && result.bodyText > 0 ? 0 : 1);
      } catch (err) {
        console.error("SMOKE_ERROR", err);
        app.exit(1);
      }
    });
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
