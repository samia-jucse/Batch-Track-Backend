const express = require('express');

const  updateProfile  = require("../View/UpdateProfileView");

const updateProfileController = express.Router();

updateProfileController.post('/updateprofile', updateProfile);

module.exports =  updateProfileController ;
