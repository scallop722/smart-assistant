const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myapi', {
    register: async (data) => await ipcRenderer.invoke('register', data)
  }
)