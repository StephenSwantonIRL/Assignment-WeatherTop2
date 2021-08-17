"use strict"

const weatherCodes = new Map()
weatherCodes.set("200", "Thunderstorm with Light Rain")
weatherCodes.set("201", "Thunderstorm with Rain")
weatherCodes.set("202", "Thunderstorm with Heavy Rain")
weatherCodes.set("210", "Light Thunderstorm")
weatherCodes.set("211", "Thunderstorm")
weatherCodes.set("212", "Heavy Thunderstorm")
weatherCodes.set("221", "Ragged Thunderstorm")
weatherCodes.set("230", "Thunderstorm with Light Drizzle")
weatherCodes.set("231", "Thunderstorm with Drizzle")
weatherCodes.set("232", "Thunderstorm with Heavy Drizzle")
weatherCodes.set("300", "Light Intensity Drizzle")
weatherCodes.set("301", "Drizzle")
weatherCodes.set("302", "Heavy Intensity Drizzle")
weatherCodes.set("310", "Light Intensity Drizzle Rain")
weatherCodes.set("311", "Drizzle Rain")
weatherCodes.set("312", "Heavy Intensity Drizzle Rain")
weatherCodes.set("313", "Shower Rain And Drizzle")
weatherCodes.set("314", "Heavy Shower Rain And Drizzle")
weatherCodes.set("321", "Shower Drizzle")
weatherCodes.set("500", "Light Rain")
weatherCodes.set("501", "Moderate Rain")
weatherCodes.set("502", "Heavy Intensity Rain")
weatherCodes.set("503", "Very Heavy Rain")
weatherCodes.set("504", "Extreme Rain")
weatherCodes.set("511", "Freezing Rain")
weatherCodes.set("520", "Light Intensity Shower Rain")
weatherCodes.set("521", "Shower Rain")
weatherCodes.set("522", "Heavy Intensity Shower Rain")
weatherCodes.set("531", "Ragged Shower Rain")
weatherCodes.set("600", "Light Snow")
weatherCodes.set("601", "Snow")
weatherCodes.set("602", "Heavy Snow")
weatherCodes.set("611", "Sleet")
weatherCodes.set("612", "Light Shower Sleet")
weatherCodes.set("613", "Shower Sleet")
weatherCodes.set("615", "Light Rain And Snow")
weatherCodes.set("616", "Rain And Snow")
weatherCodes.set("620", "Light Shower Snow")
weatherCodes.set("621", "Shower Snow")
weatherCodes.set("622", "Heavy Shower Snow")
weatherCodes.set("701", "Mist")
weatherCodes.set("711", "Smoke")
weatherCodes.set("721", "Haze")
weatherCodes.set("731", "Sand/ Dust Whirls")
weatherCodes.set("741", "Fog")
weatherCodes.set("751", "Sand")
weatherCodes.set("761", "Dust")
weatherCodes.set("762", "Volcanic Ash")
weatherCodes.set("771", "Squalls")
weatherCodes.set("781", "Tornado")
weatherCodes.set("800", "Clear Sky")
weatherCodes.set("801", "Few Clouds: 11-25%")
weatherCodes.set("802", "Scattered Clouds: 25-50%")
weatherCodes.set("803", "Broken Clouds: 51-84%")
weatherCodes.set("804", "Overcast Clouds: 85-100%")


const weatherCodeIcons = new Map()
weatherCodeIcons.set("800", "01d")
weatherCodeIcons.set("801", "02d")
weatherCodeIcons.set("802", "03d")
weatherCodeIcons.set("803", "04d")
weatherCodeIcons.set("804", "04d")
weatherCodeIcons.set("3XX", "09d")
weatherCodeIcons.set("520", "09d")
weatherCodeIcons.set("521", "09d")
weatherCodeIcons.set("522", "09d")
weatherCodeIcons.set("531", "09d")
weatherCodeIcons.set("500", "10d")
weatherCodeIcons.set("501", "10d")
weatherCodeIcons.set("502", "10d")
weatherCodeIcons.set("503", "10d")
weatherCodeIcons.set("504", "10d")
weatherCodeIcons.set("2XX", "11d")
weatherCodeIcons.set("511", "13d")
weatherCodeIcons.set("6XX", "13d")
weatherCodeIcons.set("7XX", "50d")

const readingConversions = {

  interpretWeatherCode(code) {
    return weatherCodes.get(code)

},
  generateWeatherCodeIcon(code) {
    if(code.charAt(0) == "6"){
      return weatherCodeIcons.get("6XX")
    }
     else if(code.charAt(0) == "7"){
      return weatherCodeIcons.get("7XX")
    } else if(code.charAt(0) == "2"){
      return weatherCodeIcons.get("2XX")
    } else if(code.charAt(0) == "3"){
      return weatherCodeIcons.get("3XX")
    } else {
      return weatherCodeIcons.get(code)

    }


},

convertToFahrenheit(temperature){
  return ((parseFloat(temperature) * 1.8 ) +32).toFixed(2)
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
  convertToBeaufortLabel(windSpeed){
    if (windSpeed === 0) {
      return "Calm";
    } else if (windSpeed >= 1 && windSpeed <= 6) {
      return "Light Air";
    } else if (windSpeed >= 7 && windSpeed <= 11) {
      return "Light Breeze";
    } else if (windSpeed >= 12 && windSpeed <= 19) {
      return "Gentle Breeze";
    } else if (windSpeed >= 20 && windSpeed <= 29) {
      return "Moderate Breeze";
    } else if (windSpeed >= 30 && windSpeed <= 39) {
      return "Fresh Breeze";
    } else if (windSpeed >= 40 && windSpeed <= 50) {
      return "Strong Breeze";
    } else if (windSpeed >= 51 && windSpeed <= 62) {
      return "Near Gale";
    } else if (windSpeed >= 63 && windSpeed <= 75) {
      return "Gale";
    } else if (windSpeed >= 76 && windSpeed <= 87) {
      return "Severe Gale";
    } else if (windSpeed >= 88 && windSpeed <= 102) {
      return "Strong Storm";
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      return "Violent Storm";
    } else if (windSpeed >= 117) {
      return "Violent Storm";
    } else{
      return ""
    }


  },

  calculateWindChill(temperature, windSpeed){
    let windChill = 13.12 + 0.6215 * parseFloat(temperature) -  11.37 * (Math.pow(parseFloat(windSpeed), 0.16)) + 0.3965 * parseFloat(temperature) * (Math.pow(parseFloat(windSpeed), 0.16));
    let windChillR = Math.round(windChill*100)
    return windChillR/100


  },
  directionLabel(windDirection){
  let windDirectionLabel = "";
  if ((windDirection>=348.75 && windDirection<=360 )|| (windDirection>=0 && windDirection <11.25)){
    windDirectionLabel ="North";
  }
  else if (windDirection>=11.25 && windDirection <33.75){
    windDirectionLabel ="North North East";
  }
  else if (windDirection>=33.75 && windDirection <56.25){
    windDirectionLabel ="North East";
  }
  else if (windDirection>=56.25 && windDirection <78.75){
    windDirectionLabel ="East North East";
  }
  else if (windDirection>=78.75 && windDirection <101.25){
    windDirectionLabel ="East";
  }
  else if (windDirection>=101.25 && windDirection <123.75){
    windDirectionLabel ="East South East";
  }
  else if (windDirection>=123.75 && windDirection <146.25){
    windDirectionLabel ="South East";
  }
  else if (windDirection>=146.25 && windDirection <168.75){
    windDirectionLabel ="South South East";
  }
  else if (windDirection>=168.75 && windDirection <191.25){
    windDirectionLabel ="South";
  }
  else if (windDirection>=191.25 && windDirection <213.75){
    windDirectionLabel ="South South West";
  }
  else if (windDirection>=213.75 && windDirection <236.25){
    windDirectionLabel ="South West";
  }
  else if (windDirection>=236.25 && windDirection <258.75){
    windDirectionLabel ="West South West";
  }
  else if (windDirection>=258.75 && windDirection <281.25){
    windDirectionLabel ="West";
  }
  else if (windDirection>=281.25 && windDirection <303.75){
    windDirectionLabel ="West North West";
  }
  else if (windDirection>=303.75 && windDirection <326.25){
    windDirectionLabel ="North West";
  }
  else if (windDirection>=326.25 && windDirection <348.75){
    windDirectionLabel ="North North West";
  }
  else {
    windDirectionLabel ="error - Invalid wind direction value";
  }
  return windDirectionLabel;

}

}
module.exports = readingConversions
