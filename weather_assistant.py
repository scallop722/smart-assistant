import requests
import json

url = "https://www.jma.go.jp/bosai/forecast/data/forecast/070000.json"

response = requests.get(url)
jsonData = response.json()

timeSeries = jsonData[0]["timeSeries"][0]

simple_weather = {
    "100" : "晴れ",
    "101" : "晴れ時々曇り",
    "102" : "晴れ時々雨",
    "110" : "晴れのち曇り",
    "200" : "曇り",
    "201" : "曇り時々晴れ",
    "202" : "曇り時々雨",
    "210" : "曇りのち晴れ",
    "212" : "曇のち雨",
    "313" : "雨のち曇り",
    "500" : "晴れ",
    "501" : "晴れ時々曇り",
    "510" : "晴れのち曇り",
    "601" : "曇り時々晴れ",
    "610" : "曇りのち晴れ",
}

print(timeSeries["timeDefines"][0])
aizu = timeSeries["areas"][2]
weather_code = aizu["weatherCodes"][0]
print(simple_weather[weather_code])
weather = aizu["weathers"][0]
print(weather.split("　"))
