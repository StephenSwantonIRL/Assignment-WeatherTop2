"use strict"

const weatherCodes = new Map()
weatherCodes.set("100", "Clear")
weatherCodes.set("200", "Partial Clouds")
weatherCodes.set("300", "Cloudy")
weatherCodes.set("400", "Light Showers")
weatherCodes.set("500", "Heavy Showers")
weatherCodes.set("600", "Rain")
weatherCodes.set("700", "Snow")
weatherCodes.set("800", "Thunder")

const weatherCodeIcons = new Map()
weatherCodeIcons.set("100", "sun");
weatherCodeIcons.set("200", "cloud sun");
weatherCodeIcons.set("300", "cloud");
weatherCodeIcons.set("400", "cloud sun rain");
weatherCodeIcons.set("500", "cloud showers heavy");
weatherCodeIcons.set("600", "cloud rain");
weatherCodeIcons.set("700", "snowflake");
weatherCodeIcons.set("800", "bolt");

const readingConversions = {

  interpretWeatherCode(code) {
    return weatherCodes.get(code)

},
  generateWeatherCodeIcon(code) {
    return weatherCodeIcons.get(code)
},

convertToFahrenheit(temperature){
  return (temperature * 1.8 ) +32
},

  convertToBeaufort(windSpeed){
  if (windSpeed === 0) {
    return 0;
  } else if (windSpeed >= 1 && windSpeed <= 6) {
    return 1;
  } else if (windSpeed >= 7 && windSpeed <= 11) {
    return 2;
  } else if (windSpeed >= 12 && windSpeed <= 19) {
    return 3;
  } else if (windSpeed >= 20 && windSpeed <= 29) {
    return 4;
  } else if (windSpeed >= 30 && windSpeed <= 39) {
    return 5;
  } else if (windSpeed >= 40 && windSpeed <= 50) {
    return 6;
  } else if (windSpeed >= 51 && windSpeed <= 62) {
    return 7;
  } else if (windSpeed >= 63 && windSpeed <= 75) {
    return 8;
  } else if (windSpeed >= 76 && windSpeed <= 87) {
    return 9;
  } else if (windSpeed >= 88 && windSpeed <= 102) {
    return 10;
  } else if (windSpeed >= 103 && windSpeed <= 117) {
    return 11;
  } else if (windSpeed >= 117) {
    return 12;
  }


},

  calculateWindChill(temperature, windSpeed){
    let windChill = 13.12 + 0.6215 * parseFloat(temperature) -  11.37 * (Math.pow(parseFloat(windSpeed), 0.16)) + 0.3965 * parseFloat(temperature) * (Math.pow(parseFloat(windSpeed), 0.16));
    let windChillR = Math.round(windChill*100)
    return windChillR/100


  },
  directionLabel(windDirection){
  let windDirectionLabel = "";
  if ((windDirection>360 )|| (windDirection<0)){
    windDirectionLabel ="error - Invalid wind direction value";
  }
  if ((windDirection>=348.75 && windDirection<=360 )|| (windDirection>=0 && windDirection <11.25)){
    windDirectionLabel ="North";
  }
  if (windDirection>=11.25 && windDirection <33.75){
    windDirectionLabel ="North North East";
  }
  if (windDirection>=33.75 && windDirection <56.25){
    windDirectionLabel ="North East";
  }
  if (windDirection>=56.25 && windDirection <78.75){
    windDirectionLabel ="East North East";
  }
  if (windDirection>=78.75 && windDirection <101.25){
    windDirectionLabel ="East";
  }
  if (windDirection>=101.25 && windDirection <123.75){
    windDirectionLabel ="East South East";
  }
  if (windDirection>=123.75 && windDirection <146.25){
    windDirectionLabel ="South East";
  }
  if (windDirection>=146.25 && windDirection <168.75){
    windDirectionLabel ="South South East";
  }
  if (windDirection>=168.75 && windDirection <191.25){
    windDirectionLabel ="South";
  }
  if (windDirection>=191.25 && windDirection <213.75){
    windDirectionLabel ="South South West";
  }
  if (windDirection>=213.75 && windDirection <236.25){
    windDirectionLabel ="South West";
  }
  if (windDirection>=236.25 && windDirection <258.75){
    windDirectionLabel ="West South West";
  }
  if (windDirection>=258.75 && windDirection <281.25){
    windDirectionLabel ="West";
  }
  if (windDirection>=281.25 && windDirection <303.75){
    windDirectionLabel ="West North West";
  }
  if (windDirection>=303.75 && windDirection <326.25){
    windDirectionLabel ="North West";
  }
  if (windDirection>=326.25 && windDirection <348.75){
    windDirectionLabel ="North North West";
  }
  return windDirectionLabel;

}

}
module.exports = readingConversions
