"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js")
const readingConversions = require("../utils/readingconversions")
const uuid = require("uuid")

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering")
    function anyStations(stations) {
      if (stations.length === 0) {
        return 1
      } else {
        return 0
      }
    }

    let stations = stationStore.getAllStations()
    for(let i=0; i<stations.length; i++){
      stations[i].latestReading = stations[i].readings[0]
    }
    for(let i=0; i<stations.length; i++){
      stations[i].latestReading = stations[i].readings[0]
    }
    const viewData = {
      title: "WeatherTop V2 Dashboard",
      stations: stations,
      stationsempty: anyStations(stationStore.getAllStations())
    }
    response.render("dashboard", viewData)
    logger.info(viewData);
  },
};

module.exports = dashboard
