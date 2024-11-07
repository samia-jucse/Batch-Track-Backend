const express = require('express');
const {login} = require("../View/LoginView");
const loginRouter = express.Router();

loginRouter.post("/",login);


module.exports = loginRouter;
