const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require('fs');

const VoiceText = require('voicetext');
const voice = new VoiceText('vg5xe2hrcn87c9kw');
const player = require("./WavPlayer");

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
  // win.webContents.openDevTools();
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

ipcMain.handle("talkSchedule", async (e, date) => {
  const schedule = await calendar.doc(date).get();
  const scheduleData = schedule.data();
  const pre = `今日の予定を案内します。`;

  const event = (scheduleData && scheduleData.event) ? `行事は${scheduleData.event}で、` : '行事はundefinedで、';
  const homework = (scheduleData && scheduleData.homework) ? `宿題は${scheduleData.homework}で、` : '宿題はundefinedで、';
  const submissions = (scheduleData && scheduleData.submissions) ? `提出物は${scheduleData.submissions}です。` : '提出物はundefinedです。';

  const text = pre + event + homework + submissions;

  voice
    .speaker(voice.SPEAKER.HIKARI)
    .speak(text, (e, buf) => {
      fs.writeFile('./schedule.wav', buf, 'binary', (e) => {})
      player.play("./schedule.wav");
    });
  return;
});
