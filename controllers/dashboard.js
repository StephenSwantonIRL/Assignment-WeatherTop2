"use strict";

const logger = require("../utils/logger");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop V2 Dashboard",
      station: [

        {
          readings: {
            reading: [{
              value: "name1"
            }, {
              value: "name2"
            }, {
              value: "name3"
            }]
          },
          name: "Dunmore"
        }
      ],
      stationempty: 0
    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
