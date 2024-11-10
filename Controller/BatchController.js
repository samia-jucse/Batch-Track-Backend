const express = require("express");
const { updateBatch, getBatchById } = require("../View/BatchView");

const batchController = express.Router();

batchController.put("/updateBatch",updateBatch);
batchController.get("/getBatch",getBatchById);

module.exports = batchController;