const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myapi', {
  register: async (data) => await ipcRenderer.invoke('register', data),
  getSchedule: async (date) => await ipcRenderer.invoke('getSchedule', date),
  talkSchedule: async (date) => await ipcRenderer.invoke('talkSchedule', date),
})