"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const accounts = require("./controllers/accounts.js")
const station = require("./controllers/station.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);
router.get("/editprofile", accounts.editProfile);
router.post("/updateprofile", accounts.updateProfile);

router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/station/:id", station.index);

router.post("/dashboard/addstation", dashboard.addStation)
router.get("/dashboard/deletestation/:id", dashboard.deleteStation)
router.get("/coords/:address" , dashboard.maprequest);

router.post("/station/:id/addreading", station.addReading)
router.post("/autoread/:id", station.addAutoReading)
router.get("/station/:id/deletereading/:readingId", station.deleteReading)

module.exports = router;
