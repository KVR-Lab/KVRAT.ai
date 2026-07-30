const { app, BrowserWindow, shell } = require("electron");
const { exec } = require("child_process");

let mainWindow;

function startDashboard() {

  exec(
    'powershell -NoExit -Command "cd D:\\kvr-core\\apps\\kvr-web; pnpm dev"',
    (err) => {
      if (err) console.error(err);
    }
  );

}

function createWindow() {

  mainWindow = new BrowserWindow({

    width: 1700,
    height: 1000,

    minWidth: 1200,
    minHeight: 800,

    title: "KVR-Core Dashboard",

    autoHideMenuBar: true,

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }

  });

  setTimeout(() => {

    mainWindow.loadURL("http://localhost:3000");

  }, 7000);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {

    shell.openExternal(url);

    return { action: "deny" };

  });

}

app.whenReady().then(() => {

  startDashboard();

  createWindow();

});

app.on("window-all-closed", () => {

  app.quit();

});