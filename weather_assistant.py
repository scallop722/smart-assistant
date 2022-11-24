import requests
import json

url = "https://www.jma.go.jp/bosai/forecast/data/forecast/070000.json"

response = requests.get(url)
jsonData = response.json()

timeSeries = jsonData[0]["timeSeries"][0]

print(timeSeries["timeDefines"][0])
aizu = timeSeries["areas"][2]
weather = aizu["weathers"][0]
print(weather)
