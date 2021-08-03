"use strict"

const _ = require('lodash')
function getDistance(origin, destination) { //distance function based on haversine formula from https://stackoverflow.com/questions/43167417/calculate-distance-between-two-points-in-leaflet
  // return distance in meters
  const lon1 = toRadian(origin[1]),
    lat1 = toRadian(origin[0]),
    lon2 = toRadian(destination[1]),
    lat2 = toRadian(destination[0])

  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
}
function toRadian(degree) {
  return degree*Math.PI/180;
}
function toDegree(radian) {
  return radian*180/Math.PI
}
function getMidPoint(lat1,lat2,lon1,lon2){ // adapted from midpoint formula on http://www.movable-type.co.uk/scripts/latlong.html
  const Bx = Math.cos(toRadian(lat2)) * Math.cos(toRadian(lon2)-toRadian(lon1));
  const By = Math.cos(toRadian(lat2)) * Math.sin(toRadian(lon2)-toRadian(lon1));
  const lat3 = Math.atan2(Math.sin(toRadian(lat1)) + Math.sin(toRadian(lat2)),
    Math.sqrt( (Math.cos(toRadian(lat1))+Bx)*(Math.cos(toRadian(lat1))+Bx) + By*By ) );
  const lon3 = toRadian(lon1) + Math.atan2(By, Math.cos(toRadian(lat1)) + Bx);

  return [toDegree(lat3),toDegree(lon3)]

}



const mapCalculations = {
  setInitialZoom(coords){
    let maxDistance = 0;
    let clonedCoords = _.cloneDeep(coords)
    for (let i = 0; i < clonedCoords.length; i++) {
      let compare = clonedCoords.shift()
      for (let j = 0; j < clonedCoords.length; j++) {
        if (getDistance(compare, clonedCoords[j]) > maxDistance) {
          maxDistance = getDistance(compare, clonedCoords[j])
        }
      }
    }
    if (maxDistance < 0.4) {
      return 15
    } else if (maxDistance < 0.75) {
      return 14
    } else if (maxDistance < 1.5) {
      return 13
    } else if (maxDistance < 3) {
      return 12
    } else if (maxDistance < 6) {
      return 11
    } else if (maxDistance < 11) {
      return 10
    } else if (maxDistance < 22) {
      return 9
    } else if (maxDistance < 44) {
      return 8
    } else if (maxDistance < 88) {
      return 7
    } else if (maxDistance < 176) {
      return 6
    } else if (maxDistance < 352) {
      return 5
    } else {
      return 4
    }
  },
  centreMap(coords) {
    let maxDistance = 0;
    let centreCoords = coords[0]
    let clonedCoords = _.cloneDeep(coords)
    for (let i = 0; i < clonedCoords.length; i++) {
      let compare = clonedCoords.shift()
      for (let j = 0; j < clonedCoords.length; j++) {
        if (getDistance(compare, clonedCoords[j]) > maxDistance) {
          maxDistance = getDistance(compare, clonedCoords[j])
          centreCoords = getMidPoint(Number(compare[0]),Number(clonedCoords[j][0]),Number(compare[1]),Number(clonedCoords[j][1]))
        }
      }
    }
    return centreCoords
  }
}

module.exports = mapCalculations