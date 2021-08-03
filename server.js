"use strict";

const express = require("express");
const logger = require("./utils/logger");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const readingConversions = require("./utils/readingconversions.js")
const stationAnalytics = require("./utils/stationanalytics")

const app = express();
app.use(cookieParser());
const exphbs = require("express-handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.engine(
  ".hbs",
  exphbs({
      extname: ".hbs",
      defaultLayout: "main",
      helpers: {
        converttofahrenheit: (temperature) => readingConversions.convertToFahrenheit(temperature),
        interpretweathercode: (code) => readingConversions.interpretWeatherCode(code),
        weathericon: (code) => readingConversions.generateWeatherCodeIcon(code),
        beaufort: (windSpeed) => readingConversions.convertToBeaufort(windSpeed),
        beaufortlabel: (windSpeed) => "TBC",
        winddirectionlabel: (windDirection) => readingConversions.directionLabel(windDirection),
        windchill: (temperature, windSpeed) => readingConversions.calculateWindChill(temperature,windSpeed),
        trend: (reading1,reading2,reading3) => stationAnalytics.determineTrend(reading1,reading2,reading3),
        trendicon: (reading1, reading2, reading3) => stationAnalytics.getTrendIcon(reading1,reading2,reading3)
        }
      }

  )
);
app.set("view engine", ".hbs");

const routes = require("./routes");
app.use("/", routes);

const listener = app.listen(process.env.PORT || 4000, function() {
  logger.info(`glitch-template-1 started on port ${listener.address().port}`);
});
