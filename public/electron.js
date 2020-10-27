// Modules to control application life and create native browser window
// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const path = require('path')

const isDev = require('electron-is-dev')

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 720,
    height: 480,
    minHeight: 425,
    minWidth: 480,
    autoHideMenuBar: true,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.resolve(__dirname, 'index.html')}`,
  )
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (isDev) {
    const menu = Menu.getApplicationMenu()
    const view = menu.items[2]
    view.submenu.append(new MenuItem({ type: 'separator' }))
    view.submenu.append(
      new MenuItem({
        label: 'Always On Top',
        type: 'checkbox',
        checked: mainWindow.isAlwaysOnTop(),
        click() {
          mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop())
        },
      }),
    )
    Menu.setApplicationMenu(menu)
  } else mainWindow.removeMenu()
}

// allows only one instance at a time
if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(createWindow)

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
}
