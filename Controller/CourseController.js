
const express = require("express");
const {getCourseDetails} = require("../View/CourseView");

courseController = express.Router();

courseController.get("/courses/:courseCode",getCourseDetails);

module.exports = courseController;