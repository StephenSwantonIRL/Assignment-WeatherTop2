"use strict";

const logger = require("../utils/logger")
const stationStore = require("../models/station-store")
const uuid = require("uuid")
const station = {
  index(request, response) {
    const stationId = request.params.id
    logger.info('Station id = ' + stationId)
    const station = stationStore.getStation(stationId)
    let latestReading = station.readings[0]
    const viewData = {
      title: 'Station Details',
      station: stationStore.getStation(stationId),
      latestReading: latestReading
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
    const station = stationStore.getStation(stationId)
    const timestamp = new Date()

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
