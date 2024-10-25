const express = require('express');
const { createSemester } = require("../View/SemesterView"); // Import the semester view function
const semesterController = express.Router();

// Route to handle creating a new semester
semesterController.post("/semester", createSemester);

module.exports = semesterController;
