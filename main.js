// main.js - 主程序

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // 建立瀏覽器視窗
  const mainWindow = new BrowserWindow({
    width: 400, // 設定一個適合計算機的寬度
    height: 600, // 設定一個適合計算機的高度
    webPreferences: {
      // 這是為了安全考量，但在簡單範例中不影響
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // 載入 index.html 檔案
  mainWindow.loadFile('index.html');

  // *可選：開啟開發者工具 (除錯用)*
  // mainWindow.webContents.openDevTools();
}

// 當 Electron 完成初始化並準備好建立瀏覽器視窗時，會呼叫這個函式
app.whenReady().then(() => {
  createWindow();

  // 為了 macOS 的慣例：如果沒有視窗開啟，則在點擊 dock 圖標時重新建立一個
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 當所有視窗都關閉時退出應用程式 (Windows & Linux)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});