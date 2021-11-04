const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

var admin = require("firebase-admin");
var serviceAccount = require("./smart-assistant-admin-sdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const calendar = db.collection("calendar");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 2000,
    height: 1500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("./src/html/calendar.html");
  win.webContents.openDevTools();
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (win == null) {
    createWindow();
  }
});

ipcMain.handle("register", (event, data) => {
  calendar.doc(data.date).set({
    homework: data.homework,
    event: data.event,
    submissions: data.submission,
  });
});

ipcMain.handle("getSchedule", async (event, date) => {
  const schedule = await calendar.doc(date).get();
  return schedule.data();
});
