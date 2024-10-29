const express = require('express');
const {createNotice,getAllNotices} = require("../View/NoticeView");
const noticeController = express.Router();

noticeController.post("/create",createNotice);
noticeController.get("/all-notice",getAllNotices);

module.exports = noticeController;