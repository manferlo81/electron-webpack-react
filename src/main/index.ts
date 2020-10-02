import { app, BrowserWindow } from 'electron';
import { join as joinPath } from 'path';
import { format as formatUrl } from 'url';

let mainWindow: BrowserWindow = null as never;

function focus() {
  if (mainWindow) {
    mainWindow.focus();
  }
}

function createMainWindow(): void {

  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'production') {

    void mainWindow.loadURL(formatUrl({
      protocol: 'file',
      slashes: true,
      pathname: joinPath(__dirname, 'index.html'),
    }));

  } else {

    mainWindow.webContents.openDevTools();

    void mainWindow.loadURL(formatUrl({
      protocol: 'http',
      slashes: true,
      hostname: process.env.ELECTRON_WEBPACK_WDS_HOST,
      port: process.env.ELECTRON_WEBPACK_WDS_PORT,
    }));

    mainWindow.webContents.on('devtools-opened', () => {
      focus();
      setImmediate(focus);
    });

  }

  mainWindow.on('closed', () => {
    mainWindow = null as never;
  });

}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    createMainWindow();
  }
});

app.on('ready', createMainWindow);
