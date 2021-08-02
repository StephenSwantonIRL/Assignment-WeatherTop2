"use strict";

const logger = require("../utils/logger");
const _ = require("lodash")
const stationStore = require("../models/station-store.js")
const accounts = require("./accounts.js")
const readingConversions = require("../utils/readingconversions")
const stationAnalytics = require("../utils/stationanalytics")
const uuid = require("uuid")

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering")
    const loggedInUser = accounts.getCurrentUser(request)
    function anyStations(stations) {
      if (stations.length === 0) {
        return 1
      } else {
        return 0
      }
    }

    let stations = _.orderBy(_.cloneDeep(stationStore.getUserStations(loggedInUser.id)), 'name', 'asc')
    for(let i=0; i<stations.length; i++){
      stations[i].latestReading = stations[i].readings[stations[i].readings.length-1]
      stations[i].maxAndMins = {}
      stations[i].maxAndMins.maxtemp = stationAnalytics.max(stationAnalytics.allTemps(stations[i].readings))
      stations[i].maxAndMins.mintemp = stationAnalytics.min(stationAnalytics.allTemps(stations[i].readings))
      stations[i].maxAndMins.maxpressure = stationAnalytics.max(stationAnalytics.allPressures(stations[i].readings))
      stations[i].maxAndMins.minpressure = stationAnalytics.min(stationAnalytics.allPressures(stations[i].readings))
      stations[i].maxAndMins.maxwindspeed = stationAnalytics.max(stationAnalytics.allWindSpeeds(stations[i].readings))
      stations[i].maxAndMins.minwindspeed = stationAnalytics.min(stationAnalytics.allWindSpeeds(stations[i].readings))
    }
    const viewData = {
      title: "WeatherTop V2 Dashboard",
      stations: stations,
      stationsempty: anyStations(stations)
    }
    response.render("dashboard", viewData)
    logger.info(viewData);
  },
  deleteStation(request, response){
  const stationId = request.params.id
  logger.debug(`Deleting Station ${stationId}`)
  stationStore.removeStation(stationId)
  response.redirect("/dashboard")
  },
  addStation(request,response) {
    const loggedInUser = accounts.getCurrentUser(request)
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: []
    }
    stationStore.addStation(newStation)
    response.redirect("/dashboard")
  }
};

module.exports = dashboard
