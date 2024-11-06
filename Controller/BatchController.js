const express = require("express");
const { getAllBatch, createBatch } = require("../View/BatchView");

const batchController = express.Router();

// Define your routes
batchController.get("/allbatch", getAllBatch);
batchController.post("/createbatch", createBatch);

// Export the router directly
module.exports = batchController;
