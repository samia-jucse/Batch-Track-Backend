// In SemesterController.js
const express = require('express');
const { createSemester } = require("../View/SemesterView"); // Import the view function
const semesterController = express.Router();

// Route to handle creating a new semester
semesterController.post("/addsemester", createSemester); // Use directly as a handler

module.exports = semesterController;


