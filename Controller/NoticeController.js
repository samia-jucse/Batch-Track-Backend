const express = require('express');
const {handleNotice} = require("../View/NoticeView");
const noticeController = express.Router();

noticeController.post("/create",handleNotice);

module.exports = noticeController;