const express = require('express');
const { sendNotice } = require("../View/NoticeView");
const noticeRouter = express.Router();

noticeRouter.post("/sendNotice", sendNotice);

module.exports = noticeRouter;
