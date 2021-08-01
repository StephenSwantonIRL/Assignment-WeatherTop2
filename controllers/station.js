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
};

module.exports = station;
