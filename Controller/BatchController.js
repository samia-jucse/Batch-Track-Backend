const express = require("express");
const { getAllBatch, createBatch,getBatchByName } = require("../View/BatchView");

const batchController = express.Router();


batchController.get("/allbatch", getAllBatch);
batchController.post("/createbatch", createBatch);
batchController.get("/getbatchbyname", getBatchByName);
module.exports = batchController;
