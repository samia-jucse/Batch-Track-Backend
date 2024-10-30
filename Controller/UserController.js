const express = require("express");

const {saveUser, deleteUser, updateUser} = require("../View/UserView");

const userProfileController = express.Router();


userProfileController.post("/saveUser",saveUser);

// New route for deleting a user by ID
userProfileController.delete("/deleteUser/:id", deleteUser);

// New route for updating user information
userProfileController.put("/updateUser/:id", updateUser); // Use PUT for updates


module.exports = userProfileController;