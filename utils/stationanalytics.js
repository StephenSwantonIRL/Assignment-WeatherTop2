"use strict"

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

}

}

module.exports = stationAnalytics