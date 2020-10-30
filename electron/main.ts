import { app, BrowserWindow, Menu, MenuItem } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import * as isDev from 'electron-is-dev';

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 720,
    height: 480,
    minHeight: 425,
    minWidth: 480,
    autoHideMenuBar: true,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: true,
    },
  });

  if (isDev) {
    /* DEVELOPMENT */
    win.loadURL('http://localhost:3000/index.html');

    // React DevTools
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));

    win.webContents.openDevTools();

    // add always on top option
    const menu = Menu.getApplicationMenu();
    const alwaysOnTop = new MenuItem({
      label: 'Always On Top',
      type: 'checkbox',
      checked: win.isAlwaysOnTop(),
      click() {
        win?.setAlwaysOnTop(!win.isAlwaysOnTop());
      },
    });
    menu?.items?.[3]?.submenu?.insert?.(0, alwaysOnTop);
    Menu.setApplicationMenu(menu);
  } else {
    /* PRODUCTION */
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
    win.removeMenu();
  }

  win.on('closed', () => (win = null));
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}
