const express = require('express');
const {requestValidate} = require("../View/ValidateView");
const validateController = express.Router();

validateController.post("/validate",requestValidate);

module.exports = validateController;