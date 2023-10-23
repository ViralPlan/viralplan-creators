const { app, BrowserWindow } = require("electron");
const path = require("path");

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    icon: "C:\\Users\\pmpls\\Desktop\\platform\\src\\src\\assets\\img\\favicon-b.png",
    autoHideMenuBar: true,
    titleBarStyle: "default",
    titleBarOverlay: {
      color: '#000000',
      symbolColor: '#000000',
      symbolHoverColor: '#000000',
      height: 20,
    },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  mainWindow.loadFile(path.join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();
});
