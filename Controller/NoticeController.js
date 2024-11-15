const express = require('express');
const { sendNotice, getAllNotices } = require("../View/NoticeView");
const noticeController = express.Router();

noticeController.post("/sendNotice", sendNotice);


noticeController.get('/notices', getAllNotices);


module.exports = noticeController;


