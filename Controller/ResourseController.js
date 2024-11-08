

const express = require("express");
const { addResourse } = require("../View/ResourseView");

const resourceController = express.Router();

resourceController.post("/addResourse",addResourse);


module.exports = resourceController;
