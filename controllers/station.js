"use strict";

const logger = require("../utils/logger")
const _ = require('lodash')
const stationStore = require("../models/station-store")
const stationAnalytics = require("../utils/stationanalytics")
const uuid = require("uuid")
const station = {
  index(request, response) {
    const stationId = request.params.id
    logger.info('Station id = ' + stationId)
    const station = stationStore.getStation(stationId)
    let latestReading = station.readings[station.readings.length-1]
    let timeOrderedReadings = _.orderBy(_.cloneDeep(station.readings), 'timestamp', 'asc')
    let trendPossible=0
    if(timeOrderedReadings.length>=3){
      trendPossible = 1
    }
    const viewData = {
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
        r1: timeOrderedReadings[timeOrderedReadings.length-1],
        r2: timeOrderedReadings[timeOrderedReadings.length-2],
        r3: timeOrderedReadings[timeOrderedReadings.length-3]
      }
    }
    response.render('station', viewData);
    logger.info(viewData);
  },
  deleteReading(request, response){
    const stationId = request.params.id
    const readingId = request.params.readingId
    logger.debug(`Deleting Reading ${readingId} from ${stationId}`)
    stationStore.removeReading(stationId, readingId)
    response.redirect("/station/"+stationId)
  },
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
  }

};

module.exports = station;
