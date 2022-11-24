const request = require("request");

class Weather {
  static getWeather(targetDate) {

    return new Promise(function(resolve, reject) {
      
      console.log(targetDate);
      const options = {
        url: "https://www.jma.go.jp/bosai/forecast/data/forecast/070000.json",
        method: "GET"
      }
  
      request(options, function (error, response, body) {
        const weather = JSON.parse(body)[0];
        const timeDefines = weather["timeSeries"][0]["timeDefines"];
  
        let index = -1;
        for (let i = 0; i < timeDefines.length; i++) {
          if (timeDefines[i].startsWith(targetDate)) {
            index = i;
            break;
          }
        }
  
        if (index === -1) {
          resolve("undefined")
        } else {
          const aizu = weather["timeSeries"][0]["areas"][2];
          resolve(aizu["weathers"][index]);
        }
      });
    })
  }
}

module.exports = Weather;