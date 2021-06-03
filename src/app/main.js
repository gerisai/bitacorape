const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const url = require('url');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        icon: __dirname + "/PE.png",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../views/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    ipcMain.on('renderTicket', (event, arg) => {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/index.html'),
            protocol: 'file:',
            slashes: true
        }));

        const renderTicket = () => {
            mainWindow.webContents.send('renderLog',arg);
        };

        mainWindow.webContents.on('did-finish-load',renderTicket);

        setTimeout(() => mainWindow.webContents.removeListener('did-finish-load',renderTicket), 500);
    });

    Menu.setApplicationMenu(null);
})