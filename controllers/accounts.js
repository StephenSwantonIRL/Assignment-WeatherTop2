"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("station", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },
  editProfile(request, response) {
    const userEmail = request.cookies.station;
    const loggedInUser = userstore.getUserByEmail(userEmail);
    const notify = "Edit your details using this form."
    const viewData = {
      title: "Edit your Profile",
      notify: notify,
      user: loggedInUser

    }
    logger.info(viewData);
    response.render("editprofile", viewData);
  },
  updateProfile(request,response)  {
    const userEmail = request.cookies.station;
    const loggedInUser = userstore.getUserByEmail(userEmail);
    const updatedUserDetails = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      password: request.body.password,
    }
    userstore.updateUser(loggedInUser, updatedUserDetails)
    const notify = "Your updated details have been saved!"
    const viewData = {
      title: "Edit your Profile",
      notify: notify,
      user: loggedInUser
    }
    response.render("editprofile", viewData);
  }

};

module.exports = accounts;
