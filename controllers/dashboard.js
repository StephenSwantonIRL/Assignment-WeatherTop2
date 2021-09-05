"use strict";

const logger = require("../utils/logger");
const _ = require("lodash")
const stationStore = require("../models/station-store.js")
const accounts = require("./accounts.js")
const readingConversions = require("../utils/readingconversions")
const projectAPIs = require("../apis")
const axios = require("axios")
const stationAnalytics = require("../utils/stationanalytics")
const mapCalculations = require("../utils/mapcalculations")
const uuid = require("uuid")

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering")
    const loggedInUser = accounts.getCurrentUser(request)
    if (loggedInUser) {
      function anyStations(stations) {
        if (stations.length === 0) {
          return 1
        } else {
          return 0
        }
      }
      let stations = _.orderBy(_.cloneDeep(stationStore.getUserStations(loggedInUser.id)), 'name', 'asc')
      for (let i = 0; i < stations.length; i++) {
        stations[i].maxAndMins = {}
        stations[i].maxAndMins.maxtemp = stationAnalytics.max(stationAnalytics.allTemps(stations[i].readings))
        stations[i].maxAndMins.mintemp = stationAnalytics.min(stationAnalytics.allTemps(stations[i].readings))
        stations[i].maxAndMins.maxpressure = stationAnalytics.max(stationAnalytics.allPressures(stations[i].readings))
        stations[i].maxAndMins.minpressure = stationAnalytics.min(stationAnalytics.allPressures(stations[i].readings))
        stations[i].maxAndMins.maxwindspeed = stationAnalytics.max(stationAnalytics.allWindSpeeds(stations[i].readings))
        stations[i].maxAndMins.minwindspeed = stationAnalytics.min(stationAnalytics.allWindSpeeds(stations[i].readings))
        let readingclone = _.orderBy(_.cloneDeep(stations[i].readings), 'timestamp', 'asc')
        stations[i].latestReading = readingclone[readingclone.length - 1]
        stations[i].lastThree = {}
        stations[i].lastThree.r1 = readingclone[readingclone.length - 1]
        stations[i].lastThree.r2 = readingclone[readingclone.length - 2]
        stations[i].lastThree.r3 = readingclone[readingclone.length - 3]
        if (readingclone.length >= 3) {
          stations[i].trendpossible = 1
        }
      }
      let coords = []
      for (let i = 0; i < stations.length; i++) {
        coords.push([stations[i].latitude, stations[i].longitude])
      }
      logger.info(coords);
      const viewData = {
        title: "WeatherTop V2 Dashboard",
        stations: stations,
        stationsempty: anyStations(stations),
        layout: 'dashboardlayout',
        mapZoom: mapCalculations.setInitialZoom(coords),
        centrelat: mapCalculations.centreMap(coords)[0],
        centrelon: mapCalculations.centreMap(coords)[1],
        mapboxtoken: process.env.MAPBOX
      }
      response.render("dashboard", viewData)
      logger.info(viewData);
    } else {
      response.redirect("/login")
    }
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
  },
  async maprequest(request, response) {
    console.log(request.params)
    logger.info("rendering new report");
    const mapRequest = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.params.address}&key=${projectAPIs.googleGeo}`
    console.log(mapRequest)
    const result = await axios.get(mapRequest);
    if (result.status == 200) {
      let x = result.data.results[0].geometry.location
      console.log(x)
      response.send({x});
    }
  }
};

module.exports = dashboard
