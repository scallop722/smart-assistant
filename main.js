const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain

let win

function createWindow () {
    win = new BrowserWindow({ 
        width: 800, 
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        } 
    })
    win.loadFile('./src/html/calendar.html')
    win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (win == null) {
        createWindow()
    }
})

ipc.on('register', function (event, value) {
    console.log(value)
    event.sender.send('registered', 'pong')
})