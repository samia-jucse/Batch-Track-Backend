const express = require('express');
const {requestValidate, getAllValidateBatch, getOneValidateBatch} = require("../View/ValidateView");
const validateController = express.Router();

validateController.post("/validate",requestValidate);
validateController.get("/allValidateEmails",getAllValidateBatch);
validateController.get("/validateBatch",getOneValidateBatch);

module.exports = validateController;