const timetable = {
    "0" : ["お休み"],
    "1" : ["体育", "国語", "数学", "英語", "物理"],
    "2" : ["体育", "国語", "数学", "英語", "物理"],
    "3" : ["体育", "国語", "数学", "英語", "物理"],
    "4" : ["体育", "国語", "数学", "英語", "物理"],
    "5" : ["体育", "国語", "数学", "英語", "物理"],
    "6" : ["お休み"]
};

const today = new Date();
console.log("本日の時間割りは")
for (lesson of timetable[today.getDay()]) {
    console.log(lesson);
}
console.log("です。")