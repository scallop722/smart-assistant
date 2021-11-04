var admin = require("firebase-admin");
var serviceAccount = require("./smart-assistant-9f6ad-firebase-adminsdk-dya3y-0d2c9fb816.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const calendar = db.collection("calendar");

calendar.doc("2021-07-29").set({
  homework: "English",
  event: "お昼寝"
});

calendar.doc("2021-07-28").set({
  homework: "国語の作文",
  event: "お昼寝"
});
