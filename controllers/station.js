"use strict";

const logger = require("../utils/logger");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info('Station id = ' + stationId);
    const viewData = {
      title: 'DunmoreTitle',
      station: 'station1',
      readings : [ {id : 1 ,  timestamp : 2020 ,  code : 800 ,  temperature : 36 ,  windSpeed : 40 ,  windDirection : 134 ,  pressure : 900 } , {reading:'reading2'}, {reading:'reading3'}]

    }
    response.render('station', viewData);
  },
};

module.exports = station;
