const moment = require("moment");
const player = require("./WavPlayer")

const timetable = {
    "0" : ["お休み"], // 日曜日
    "1" : ["体育", "国語", "数学", "英語", "物理"],
    "2" : ["体育", "国語", "数学", "英語", "物理"],
    "3" : ["体育", "国語", "数学", "英語", "物理"],
    "4" : ["体育", "国語", "数学", "英語", "物理"],
    "5" : ["体育", "国語", "数学", "英語", "物理"],
    "6" : ["お休み"] // 土曜日
};

const today = moment();
console.log(today);

player.play("./時間割音声/本日の時間割は.wav")
for (lesson of timetable[today.day()]) {
    console.log(lesson);
}
console.log("です。")