const express = require('express');
const { sendNotice, getAllNotices } = require("../View/NoticeView");
const noticeRouter = express.Router();

noticeRouter.post("/sendNotice", sendNotice);


noticeRouter.get('/notices', getAllNotices);


module.exports = noticeRouter;


