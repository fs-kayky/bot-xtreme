const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    resizable: false,
    
    webContent: {
      nodeIntegration: true,
    },
  });

  win.loadFile('./src/app/pages/home/home.html');
}


app.whenReady().then(() => {
    createWindow()
  })