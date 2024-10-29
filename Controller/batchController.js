const express = require("express");
const { getallBatch, createBatch } = require("../View/BatchView");

const batchController = express.Router();

// Define your routes
batchController.get("/allbatch", getallBatch);
batchController.post("/createbatch", createBatch);

// Export the router directly
module.exports = batchController;
