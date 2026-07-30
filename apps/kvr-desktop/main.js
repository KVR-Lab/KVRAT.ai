const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 950,
    minWidth: 1200,
    minHeight: 700,
    title: "KVR-Core Control Center",
    autoHideMenuBar: true,
    show: false,
    backgroundColor: "#111827",

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL("http://localhost:3000");

  win.maximize();
  win.setMenuBarVisibility(false);

  win.webContents.on("did-fail-load", (event, code, description) => {
    console.log("LOAD ERROR:", code, description);
  });

  win.webContents.on("did-finish-load", () => {
    console.log("KVR Web Loaded");
  });

  win.once("ready-to-show", () => {
    win.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
