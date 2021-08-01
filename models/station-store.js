"use strict"
const _ = require("lodash")
const JsonStore = require("./json-store")

const stationStore = {
  store: new JsonStore("./models/station-store.json", {
  stationCollection: []
}),
  collection: "stationCollection",
  getAllStations(){
    return this.store.findAll(this.collection)
  },
  getStation(id){
    return this.store.findOneBy(this.collection, {id:id})
  },
  addStation(station){
    this.store.add(this.collection, station)
    this.store.save()
  },
  removeStation(id){
    const station = this.getStation(id)
    this.store.removeStation(this.collection, station)
    this.store.save()
  },
  addReading(id, reading){
    const station = this.getStation(id)
    station.reading.push(reading)
    this.store.save()
  },
  removeReading(id, readingId){
    const station = this.getStation(id)
    const readings = station.readings
    _.remove(readings, {id: readingId})
    this.store.save()
  },
  getReading(stationId, readingId){
    const station = this.store.findOneBy(this.collection, {id :stationid})
    const readings = station.readings.filter(reading => reading.id == readingId)
    return readings[0]
  },
  updateReading(reading, updatedReading){
    reading.code = updatedReading.code
    reading.temperature = updatedReading.temperature
    reading.windSpeed = updatedReading.windSpeed
    reading.windDirection = updatedReading.windDirection
    reading.pressure = updatedReading.pressure
    reading.timestamp = updatedReading.timestamp
    this.store.save()
  }
}
module.exports = stationStore