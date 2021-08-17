"use strict";

const logger = require("../utils/logger")
const projectAPIs = require("../apis")
const axios = require("axios")
const _ = require('lodash')
const stationStore = require("../models/station-store")
const stationAnalytics = require("../utils/stationanalytics")
const uuid = require("uuid")
const accounts = require("./accounts")

const station = {
  index(request, response) {
    if (accounts.getCurrentUser(request)) {
      const loggedInUserId = accounts.getCurrentUser(request).id

      const stationId = request.params.id
      logger.info('Station id = ' + stationId)
      const station = stationStore.getStation(stationId)
      if (station.userid === loggedInUserId) {

        let timeOrderedReadings = _.orderBy(_.cloneDeep(station.readings), 'timestamp', 'asc')
        let latestReading = timeOrderedReadings[timeOrderedReadings.length - 1]
        let trendPossible = 0
        if (timeOrderedReadings.length >= 3) {
          trendPossible = 1
        }
        const viewData = {
          layout: 'stationlayout',
          title: 'Station Details',
          station: stationStore.getStation(stationId),
          latestReading: latestReading,
          maxAndMins: {
            maxtemp: stationAnalytics.max(stationAnalytics.allTemps(station.readings)),
            maxpressure: stationAnalytics.max(stationAnalytics.allPressures(station.readings)),
            maxwindspeed: stationAnalytics.max(stationAnalytics.allWindSpeeds(station.readings)),
            mintemp: stationAnalytics.min(stationAnalytics.allTemps(station.readings)),
            minpressure: stationAnalytics.min(stationAnalytics.allPressures(station.readings)),
            minwindspeed: stationAnalytics.min(stationAnalytics.allWindSpeeds(station.readings))
          },
          trendpossible: trendPossible,
          lastThree: {
            r1: timeOrderedReadings[timeOrderedReadings.length - 1],
            r2: timeOrderedReadings[timeOrderedReadings.length - 2],
            r3: timeOrderedReadings[timeOrderedReadings.length - 3]
          }
        }
        response.render('station', viewData);
        logger.info(viewData);
      } else {
        response.redirect('/login')
      }
    } else {
      response.redirect('/login')
    }
  },
    deleteReading(request, response)
    {
      const stationId = request.params.id
      const readingId = request.params.readingId
      logger.debug(`Deleting Reading ${readingId} from ${stationId}`)
      stationStore.removeReading(stationId, readingId)
      response.redirect("/station/" + stationId)
    }
  ,
  addReading(request, response){
    const stationId = request.params.id
    //const station = stationStore.getStation(stationId)
    const timestamp = new Date().toISOString()

    const newReading = {
      id : uuid.v1(),
      code : request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
      timestamp: timestamp
    }
    logger.debug("New Reading = ", newReading)
    stationStore.addReading(stationId, newReading)
    response.redirect("/station/"+stationId)
  },
  async addAutoReading(request, response) {
    logger.info("new Auto report");
    const stationId = request.params.id
    const station = stationStore.getStation(stationId)
    const timestamp = new Date().toISOString()
    let report = {};
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${station.latitude}&lon=${station.longitude}&units=metric&appid=${projectAPIs.openweather}`
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.id = uuid.v1()
      report.code = reading.weather[0].id.toString();
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      report.timestamp = timestamp;
    }
    stationStore.addReading(stationId, report)

    response.redirect("/station/"+stationId);
  }

};

module.exports = station;
