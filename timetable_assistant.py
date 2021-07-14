import datetime
import locale

# 時間割マスタ
timetable = {
    "Mon" : ("体育", "国語", "数学", "英語", "物理"),
    "Tue" : ("体育", "国語", "数学", "英語", "物理"),
    "Wed" : ("体育", "国語", "数学", "英語", "物理"),
    "Thr" : ("体育", "国語", "数学", "英語", "物理"),
    "Fri" : ("体育", "国語", "数学", "英語", "物理"),
    "Sat" : ("体育", "国語", "数学", "英語", "物理"),
    "Sun" : ("体育", "国語", "数学", "英語", "物理")
}

# 今日の曜日を出力
today = datetime.date.today()
day_of_week = today.strftime("%a")

print(day_of_week)
print("本日の時間割りは")
for lesson in timetable[day_of_week]:
    print(lesson)
print("です。")

for day in range(7):
    print((today + datetime.timedelta(days=day)).strftime("%a"))

# ロケールを設定
locale.setlocale(locale.LC_ALL, "ja_JP.UTF-8")
print(today.strftime("%a"))

for day in range(7):
    print((today + datetime.timedelta(days=day)).strftime("%a"))

print(range(7))
