const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  searchFiles: (searchTerm) => ipcRenderer.invoke('search-files', searchTerm),
  getDownloadsPath: () => ipcRenderer.invoke('get-downloads-path')
});