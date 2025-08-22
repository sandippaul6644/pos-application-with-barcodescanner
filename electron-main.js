const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const os = require('os');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('dist/my-angular-app/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for file operations
ipcMain.handle('get-downloads-path', () => {
  return '/home/ttc015/Downloads/POS-ASSET';
});

ipcMain.handle('search-files', async (event, searchTerm) => {
  const posAssetPath = path.join(os.homedir(), 'Downloads', 'POS-ASSET');
  const result = { image: null, video: null };

  try {
    // Search in images folder
    const imagesPath = path.join(posAssetPath, 'images');
    const imageFile = await searchInFolder(imagesPath, searchTerm, ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']);
    if (imageFile) {
      result.image = `file://${imageFile}`;
    }

    // Search in video folder
    const videosPath = path.join(posAssetPath, 'video');
    const videoFile = await searchInFolder(videosPath, searchTerm, ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm']);
    if (videoFile) {
      result.video = `file://${videoFile}`;
    }
  } catch (error) {
    console.error('Error searching files:', error);
  }

  return result;
});

async function searchInFolder(folderPath, searchTerm, extensions) {
  try {
    const files = await fs.readdir(folderPath);
    
    for (const ext of extensions) {
      const fileName = `${searchTerm}${ext}`;
      if (files.includes(fileName)) {
        return path.join(folderPath, fileName);
      }
    }
  } catch (error) {
    console.error(`Error reading folder ${folderPath}:`, error);
  }
  
  return null;
}