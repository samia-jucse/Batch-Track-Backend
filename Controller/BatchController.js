const express = require("express");
const { updateBatch } = require("../View/BatchView");

const batchController = express.Router();

batchController.put("/updateBatch",updateBatch);


module.exports = batchController;