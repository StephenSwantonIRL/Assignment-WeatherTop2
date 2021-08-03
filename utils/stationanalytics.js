"use strict"
const logger = require("../utils/logger")

const stationAnalytics = {

  allTemps(readings){
    let temperatures = []

    for(let i=0; i<readings.length;i++){
      temperatures.push(parseFloat(readings[i].temperature))
    }
    return temperatures
  },
  allPressures(readings){
    let pressures = []

    for(let i=0; i<readings.length;i++){
      pressures.push(parseFloat(readings[i].pressure))
    }
    return pressures
  },
  allWindSpeeds(readings) {
    let windSpeeds = []

    for (let i = 0; i < readings.length; i++) {
      windSpeeds.push(parseFloat(readings[i].windSpeed))
    }
    return windSpeeds
  },
    max(values){
  let max = values[0];
      function compareToMax(value) {
        if (value > max) {
          max = value;
        }
      }
  values.forEach(compareToMax);
  return max;

},
  min(values){
  let min = values[0];

  function compareToMin(value){
    if (value <min) {
      min = value;
    }
  }
  values.forEach(compareToMin);
  return min;

},
  determineTrend(reading1, reading2, reading3) {
    let trend;
    reading1 = Number(reading1)
    reading2 = Number(reading2)
    reading3 = Number(reading3)
    logger.info(reading1)
    logger.info(reading2)
    logger.info(reading3)
    if (reading1 > reading2 && reading2 > reading3) {
      trend = "Rising";
    } else if (reading3 > reading2 && reading2 > reading1) {
      trend = "Falling";
    } else {
      trend = "Steady";
    }
    return trend;
  },
  getTrendIcon(reading1, reading2, reading3){
      let trendicon;
      reading1 = Number(reading1)
      reading2 = Number(reading2)
      reading3 = Number(reading3)
      if (reading1 > reading2 && reading2 > reading3) {
        trendicon = "up";
      } else if (reading3 > reading2 && reading2 > reading1) {
        trendicon = "down";
      } else {
        trendicon = "";
      }
      return trendicon;
    }


}

module.exports = stationAnalytics