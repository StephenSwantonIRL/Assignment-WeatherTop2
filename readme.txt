Readme Contents

1. About the Project
2. Features and Functionality
	2.1 Data Storage and Retrieval
	2.2 Readings including Auto Readings and Graphs
	2.3 Stations including Map of Stations and Station Location
	2.4 Members

3. Glitch Deployment / Installation
4. Reference List
5. Image Credits
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1.	About the project

This project refactors the Play Framework version of the WeatherTop site to run on a JavaScript environment. It includes all previous functionality such as creating and editing user accounts, adding and removing user stations, adding and removing station readings. It also allows includes a number of additional UX enhancements such as providing users with a map of their stations, allowing users to automatically generate the coordinates of their stations and to automatically add readings from the latest conditions at their station location. Stations also provide a chart representation of the conditions at the station based on the readings stored in the system.


The application is built on version 14.16.0 of Node.js and the Express.js Framework version 4.17.1 and adopts the model-view-controller design pattern with the assistance of the express-handlebars library (5.3.2). The front end design has been retained from the Play version of WeatherTop  and continues to rely on the fomantic-ui framework for much of the design. Data is stored using the lowdb library (v1).

The initial project commit was cloned from the following github repository:

https://github.com/wit-hdip-comp-sci-2021/glitch-template

The final project has the following structure:


├──controllers
│ 	├──about.js
│ 	├──accounts.js
│ 	├──dashboard.js
│ 	└──station.js
├──models
│ 	├──json-store.js
│ 	├──station-store.js
│ 	├──station-store.json
│ 	├──user-store.js
│ 	└──user-store.json
│
├──public
│    	├──images
│    	│   ├──	anemometer.jpg
│	│   ├──	castanzo.png
│	│   ├──	favicon.png
│	│   ├──	install.png
│	│   ├──	overview.png
│	│   ├──	register.png
│	│   ├──	weathertopdevice.png
│	│   ├──	weathertoplogo.png
│	│   └──	which2.png
│	└──style.css
├──utils
│    	├──generalutils.js
│    	├──logger.js
│    	├──mapcalculations.js
│    	├──readingconversions.js
│	└──stationanayltics.js
├──views
│	├──layouts
│	│	├──dashboardlayout.hbs
│ 	│	├──main.hbs
│ 	│	└──station.hbs
│ 	├──partials
│ 	│	├──addreading.hbs
│ 	│	├──addstation.hbs
│ 	│	├──chart.hbs
│	│	├──latestreading.hbs
│ 	│	├──listreadings.hbs
│	│	├──mainpanel.hbs
│ 	│	├──map.hbs
│	│	└──menu.hbsbs
│	├──about.hbs
│	├──dashboard.hbs
│ 	├──editprofile.hbs
│ 	├──login.hbs
│ 	├──signup.hbs
│ 	└──station.hbs
├─apis.js
├─package.json
├─package-lock.json
├─routes.js
└─server.js



2. Functionality & Features

2.1.	Data Storage and Retrieval

Three types of data object are stored in the system: users, stations, and readings. The lowdb library (https://github.com/typicode/lowdb) was used to create two flat file JSON databases. One to store the user's account information (user-store) and the second to store the data related to stations and readings (station-store). The user-store id property is present as userid in the station-store. This provides a simplified one-to-many relationship between the two databases, i.e. 1 user can have many stations. Once the user is authenticated all database queries are made on the station-store.

2.2.	Readings including Autoreadings and Graphs

As with the Play Framework version of Weathertop the application requires the storage of a custom data set that represents the weather conditions at a location at a particular point in time. This includes: a three-digit code representing a weather condition (initially in format of format [0-8]00 and subsequently using the condition codes provided by OpenWeather - https://openweathermap.org/weather-conditions ), temperature, wind speed, pressure, and wind direction as well as the time at which the reading was taken. These readings were constructed in the station.js controller (ln 71-79) as an object and then passed to the station-store.json via the station-store.js addReading() function.

The specification also required the refactoring of a number of conversion methods present in the Play version of the app to perform a range of calculations on the data associated with each reading. For convenience these were stored in a single JavaScript file (readingconversions.js).

A)	Conversion to Fahrenheit [convertToFahrenheit() lines 106-108] – to return a value to two decimal places the Number.prototype.toFixed() was used.

B)	Conversion of a Wind Speed to the Beaufort Scale and provision of an associated Beaufort label. [convertToBeaufort()- ln 110-137 and convertToBeaufortLabel() ln 141-173] . In each of these functions a series of if statements was used to identify which set of values should be returned based on the  Wind Speed passed to the function.

C)	Conversion of the weather code into an associated weather label [interpretWatherCode() – ln 84-87]. A second function [generateWeatherCodeIcon() – ln 184- 216] was used to convert weather code into strings that represented the relevant icon image for display on the front end. Each of these functions used a JavaScript map (ln 3-58 and ln 61-80 respectively) where the weather code as key was searched to retrieve the associated value for that code. The map for the weather icons was simplified as the icons associated with many of were the same e.g. all OpenWeather condition codes begining in 3 shared the same icon.

D)	Conversion of Wind Direction angle to a string classifying the compass direction. [directionLabel() – Ln 182-237]. Again a series of if statements were used to evaluate the angle against the range associated with each compass direction.

E)	Wind Chill also needed to be calculated [calculateWindChill() – ln 174-181] this made use of Math.pow() to apply exponents to the wind speed and temperature and enable to conversion.


Custom Helper methods (ln 23-30) were then registered via the express-handlebars library to simplify rendering these values on the front end. This approach reduced issues related the Handlebars context particularly when dealing with partials and also reduced the complexity of the viewData objects that needed to be passed to each view as for example the Celsius value for temperature could now easily be converted to Fahrenheit by using {{converttofahrenheit temperature}} expression.

A new reading feature requested in this project was the capability to auto generate readings from the OpenWeather API (https://openweathermap.org/). To implement this a new route was created (/autoread/:id - routes.js ln 29) that passes a station ID as a request parameter to an asynchronous addAutoReading() function in the station.js controller (ln 84-105) which generates a http request to the openweather api, using the axios library, and awaits a result. The resultant data is then used to build a report object (ln 93-101) containing all fields neccessary to add a reading. This is then stored in the database using the same addReading() function used to create manual readings.

The new specification also requested that the reading data be chartable/graphically represented. The frappe chart library (https://frappe.io/charts) was used to display temperature,  pressure and wind speed readings for a station as a chart on that station's page. As the Y axis for each chart uses different units a series of buttons (on for each property) were created to toggle between the charts for each property. The implementation for the frappe charts is carried out in chart.hbs partial iterating over the timestamp values for that station's readings to populate a list of labels. A custom helper function is used to render the times in a more user friendly format. It then pulls in the value for each reading as a comma seperated list in each dataset. The standard frappe.Chart constructor is then wrapped in a function renderChart() [ln 36-52] that takes in a reading property, such as temp, as a parameter and passes this through a series of if statements to assign a value to the frappe chart data object. The chart is first constructed onload by using HTMLElement.click() to call the first renderChart() with temperature as the property. For UI purposes the temperature button is also brought into focus so that the user knows that they are viewing the temperature chart. As the frappe library is not needed on all pages a separate handlebars layout (stationlayout.hbs) was also created for the station pages so that the library's js file would only be imported when required.


2.3 Stations including Map of Stations and station locations.
As with the Play version of WeatherTop the Station object contains the following properties: name, latitude and longitude and an array of reading objects which contain the readings input by the user for that station. These stations are constructed in the dashboard.js controller (ln 72-84) as an object and then passed to the station-store.json via the station-store.js addStation() function.

At a station level there are a number of features from the Play framework version of WeatherTop that are also required in the node express version. For convenience these are also stored in a standalone file, stationanalytics.js.

These are:

A)	The calculation of Maximum and Minimum values for readings at each station. This was achieved by first creating function that returned an array with all the values for a specified property from each reading in a station (ln 6-29)
The values returned were then passed to min() [ln30-40] or max() [ln 41-52] depending on whether the minimum or maximum value was required. These functions were then called in constructing the viewData object for the station page(station.js ln 33-39) and in a for loop to add them to each user station for the  dashboard page (dashboard.js ln 28-45).

B)	To identify emerging weather trends it was necessary to first obtain the latest three reading. This was done by using the lodash orderBy() function to sort a stations readings by their timestamp. The latest and last three values were then added as properties to each station(s).  The determineTrend() function [stationanalytics.js ln 53 to 69]  takes in  three parameters to return a string representing a trend if present. A handlebars custom helper functon {{trend}} was defined to make the determineTrend() function available to latestreading.hbs file again simplifying the viewData object


An additional requirement in the refactored WeatherTop application was to implement a map of each station on the user's dashboard. This was implemented using the Leaflet.js library and the Mapbox API  by following the standard quick start implementation outlined on https://leafletjs.com/examples/quick-start/

Additional customisation was completed to centre the map on the midpoint between the users stations and also to adjust the maps initial zoom depending on how far apart the furthest stations were from each other.

Accomplishing this relied on two externally sourced functions
 - a distance function based on haversine formula from https://stackoverflow.com/questions/43167417/calculate-distance-between-two-points-in-leaflet
 - an adapted version of midpoint formula from http://www.movable-type.co.uk/scripts/latlong.html

These were then used in two custom functions:
1. setInitialZoom() (mapcalculations.js ln39 - 77). This function takes in an array of coordinates and determines the maximum distance between the coordinates contained in the array. Based on the maximum distance it uses a set of if statements to return an appropriate zoom value. This is then included as a property on the dashboard viewData object for use in generating the map on the dashboard.

2. centreMap() (mapcalculations.js ln 78-92). This function takes in an array of coordinates and loops through the values to identify the maximum distance between coordinates in the array and once complete returns the mid point between these two locations.

As the map functionality is not needed on all pages a separate handlebars layout (dashboardlayout.hbs) was also created for the dashboard page so that the leaflet.js file would only be imported when required.

In building the application it was recognised that users may not always know the latitude and longitude of their stations. Two additional features were added to the add Station frontend form to assist users with this.

1. Use of navigator.geolocation.getCurrentPosition() to request the users current location (addstation.hbs ln 36-38)
2. Use of the JavaScript fetch API to search for a latitude/longitude based on the station name (addstation.hbs ln 41-54). To implement the fetch API a new route (/coords/:address) was created to convert a fetch request into the correct format for an API query and trigger an axios request without exposing the api token on the frontend. Initially this was tested with the OpenWeather API but the results proved inconsistent for Irish locations so the Google Geocoding API was implemented instead as these proved more reliable.



2.4	Members / Users

Account functionality was developed adding accounts.js, user-store.js and user-store.js files available in the following git repository:
https://github.com/wit-hdip-comp-sci-2021/playlist-4

Minor adaptations were required as the original code did not check the password supplied against the stored password. Ln 44 of accounts.js adds this check and passes a message to a user if they submit an incorrect combination (ln 48-53)

The Edit profile functionality was also added to the accounts.js controller via two new functions editProfile() and updateProfile()

1. editProfile() retrieves the current user from the cookie stored in the user's browser and renders an editable form (using editprofile.hbs) with the users stored details.
2. updateProfile() is the target of a route that receives the editted details submitted by the users. It constructs a new user object and passes this to the updateUser function in user-store.js (ln 26-32) in a similar manner to the updateSong() function found in the playlist-store.js file from the following repository https://github.com/wit-hdip-comp-sci-2021/playlist-5


3. Glitch Deployment / Installation

To deploy your own version of this repository on Glitch.

1. Log into your Glitch account or create a new one (https://www.glitch.com)
2. Click [New Project] and [import from GitHub]
3. In the dialog that appears enter the repo address for this project: https://github.com/StephenSwantonIRL/Assignment-WeatherTop2.git
4. Edit your project .env file to create the following variables substituting YOURAPIKEY with your own API keys for the relevant services:
	OPEN_WEATHER: YOURAPIKEY
	GOOGLE_GEO: YOURAPIKEY
	MAPBOX: YOURAPIKEY

5. Thats it!

On your own system

1. Use git clone https://github.com/StephenSwantonIRL/Assignment-WeatherTop2.git to create your own  copy of the project.
2. Run npm install within the project folder
3. Edit your project .env file to create the following variables substituting YOURAPIKEY with your own API keys for the relevant services:
	OPEN_WEATHER: YOURAPIKEY
	GOOGLE_GEO: YOURAPIKEY
	MAPBOX: YOURAPIKEY
4. npm start
5. That's it!



4. References

Christian Hur 2021 - How to Create Custom Handlebars Helper Functions in Node.js/Express.js - https://www.youtube.com/watch?v=WaetjCYgB4U
Dotenv - dotenv - https://www.npmjs.com/package/dotenv
Fomantic UI Documentation - Form Validation - https://fomantic-ui.com/behaviors/form.html
Frappe Charts - Installation - https://frappe.io/charts
Frappe Charts - Areas and Trends - https://frappe.io/charts/docs/basic/trends_regions
GeeksforGeeks - Lodash _.orderBy() Method - https://www.geeksforgeeks.org/lodash-_-orderby-method/
GeeksforGeeks - Lodash _.cloneDeep() Method - https://www.geeksforgeeks.org/lodash-_-clonedeep-method/
Google Geocoding API - Get Started - https://developers.google.com/maps/documentation/geocoding/start
Hackers and Slackers - Building Page Templates in ExpressJS With Handlebars - https://hackersandslackers.com/handlebars-templates-expressjs/
Handlebars - Handlebars API reference - https://handlebarsjs.com/api-reference/
Handlebars - Handlebars Guide - https://handlebarsjs.com/guide/
John Papa - Node.js Everywhere with Environment Variables! - https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
Leaflet - Leaflet Quick Start Guide - https://leafletjs.com/examples/quick-start/
Lowdb - https://github.com/typicode/lowdb
Mozilla Foundation - Geolocation API - https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
Open Weather - Current Weather Data - https://openweathermap.org/current
Stack Overflow - Calculate Distance Between Two Points in Leaflet -  https://stackoverflow.com/questions/43167417/calculate-distance-between-two-points-in-leaflet
Stephen Swanton - WeatherTop Play Framework Version - https://github.com/StephenSwantonIRL/WeatherTop-beta
Moveable Type - Calculate distance, bearing and more between Latitude/Longitude points -  http://www.movable-type.co.uk/scripts/latlong.html
W3schools - HTML DOM focus() method - https://www.w3schools.com/jsref/met_html_focus.asp
W3schools - JavaScript Fetch API - https://www.w3schools.com/js/js_api_fetch.asp
W3schools - JavaScript Maps - https://www.w3schools.com/js/js_object_maps.asp
W3schools - JavaScript toFixed() Method - https://www.w3schools.com/jsref/jsref_tofixed.asp
W3schools - onclick Event - https://www.w3schools.com/jsref/event_onclick.asp
WIT CompSci2021 - Glitch project template - https://github.com/wit-hdip-comp-sci-2021/glitch-template
WIT CompSci2021 - Glitch Playlist version 4 - https://github.com/wit-hdip-comp-sci-2021/playlist-4
WIT CompSci2021 - Glitch Playlist version 5 - https://github.com/wit-hdip-comp-sci-2021/playlist-5



5. Image & Content Credits

Home page images & About page content - Weather Underground - wunderground.com
Site Background - Jim Castanzo on Unsplash https://unsplash.com/@jcastanzo