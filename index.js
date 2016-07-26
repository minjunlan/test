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
    win = new BrowserWindow({width:800,height:600});
    win.loadURL(`${__dirname}/index.html`);
    win.on('closed', () => {
        win = null;
    });
}