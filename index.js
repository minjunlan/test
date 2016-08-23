const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

let win;

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

function createWindow() {
    const obj = electron.screen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({width:obj.width,height:obj.height});
    win.loadURL(`${__dirname}/index.html`);
    win.on('closed', () => {
        win = null;
    });
}