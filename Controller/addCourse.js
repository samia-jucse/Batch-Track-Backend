const express = require("express");
const { addCourse } = require("../View/AddCourseView")

const courseController = express.Router();

courseController.post("/addCourse", addCourse);

module.exports = courseController;

  