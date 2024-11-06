const express = require('express');
const { sendNotice } = require('../View/AdminNotice');



const sendNotice = express.Router();

sendNotice.post("/notices",sendNotice);



module.exports =sendNotice;
