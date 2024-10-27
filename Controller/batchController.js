const express = require("express");
const {getallBatch,createBatch} = require("../View/BatchView");

const batchController = express.Router();

batchController.get("/allbatch",getallBatch);
batchController.post("/createbatch",createBatch);

module.exports = {batchController};
