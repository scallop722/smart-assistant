const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

var selectYear = today.getFullYear();
var selectMonth = today.getMonth() + 1;
var selectDay = today.getDate();

// 初期表示
window.onload = async function () {
  await showProcess(today, calendar);
};

function createDateSelectEvent() {
  document.querySelectorAll("#calendar td:not(.disabled)").forEach(function (td) {
    td.addEventListener(
      "click",
      function (e) {
        selectYear = showDate.getFullYear();
        selectMonth = showDate.getMonth() + 1;
        selectDay = Number(e.target.getAttribute("data-date"));

        // もともと選択されていた要素の色を削除
        document.querySelector(".today").classList.remove("today");
        // 
        document.querySelector(`td[data-date='${selectDay}']:not(.disabled)`).classList.add("today");
      },
      false
    );
  });
}

// 前の月表示
async function prev() {
  showDate.setMonth(showDate.getMonth() - 1);
  selectYear = showDate.getFullYear();
  selectMonth = showDate.getMonth() + 1;
  selectDay = 1;
  showProcess(showDate);
}

// 次の月表示
async function next() {
  showDate.setMonth(showDate.getMonth() + 1);
  selectYear = showDate.getFullYear();
  selectMonth = showDate.getMonth() + 1;
  selectDay = 1;
  showProcess(showDate);
}

// カレンダー表示
async function showProcess(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  document.querySelector("#header").innerHTML =
    year + "年 " + (month + 1) + "月";

  var calendar = await createProcess(year, month);
  document.querySelector("#calendar").innerHTML = calendar;

  createDateSelectEvent();
}

// カレンダー作成
async function createProcess(year, month) {
  // 曜日
  var calendar = "<table><tr class='dayOfWeek'>";
  for (var i = 0; i < week.length; i++) {
    calendar += "<th>" + week[i] + "</th>";
  }
  calendar += "</tr>";

  var count = 0;
  var startDayOfWeek = new Date(year, month, 1).getDay();
  var endDate = new Date(year, month + 1, 0).getDate();
  var lastMonthEndDate = new Date(year, month, 0).getDate();
  var row = Math.ceil((startDayOfWeek + endDate) / week.length);

  // 1行ずつ設定
  for (var i = 0; i < row; i++) {
    calendar += "<tr>";
    // 1colum単位で設定
    for (var j = 0; j < week.length; j++) {
      if (i == 0 && j < startDayOfWeek) {
        // 1行目で1日まで先月の日付を設定
        calendar +=
          "<td class='disabled'>" +
          (lastMonthEndDate - startDayOfWeek + j + 1) +
          "</td>";
      } else if (count >= endDate) {
        // 最終行で最終日以降、翌月の日付を設定
        count++;
        calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
      } else {
        // 当月の日付を曜日に照らし合わせて設定
        count++;
        const text = count + "<br>" + "宿題:なし";
        const schedule = await getSchedule(year + "-" + (month + 1) + "-" + count);
        if (
          year == selectYear &&
          month == selectMonth - 1 &&
          count == selectDay
        ) {
          calendar += `<td class='today' data-date='${count}'>` + text + "</td>";
        } else {
          calendar += `<td data-date='${count}'>` + text + "</td>";
        }
      }
    }
    calendar += "</tr>";
  }
  return calendar;
}

async function register() {
  const homework = document.getElementsByName("homework");
  const event = document.getElementsByName("event");
  const submission = document.getElementsByName("submissions");

  await window.myapi.register({
    date: selectYear + "-" + selectMonth + "-" + selectDay,
    homework: homework[0].value,
    event: event[0].value,
    submission: submission[0].value,
  });
}

async function getSchedule(date) {
  return await window.myapi.getSchedule(date);
}