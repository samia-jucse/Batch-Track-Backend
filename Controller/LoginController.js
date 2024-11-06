const express = require('express');
const {login} = require("../View/LoginView");
const loginRouter = express.Router();

loginRouter.get("/",login);


module.exports = loginRouter;
