const express = require("express");

const {saveUser, deleteUser, updateUser, getAllUsers} = require("../View/UserView");

const userProfileController = express.Router();





/**
 * Route for saving a user profile.
 *
 * @name post/saveUser
 * @function
 * @memberof userProfileController
 * @inner
 * @param {string} path - The endpoint path.
 * @param {function} saveUser - The controller function to handle saving the user.
 */
userProfileController.post("/saveUser",saveUser);

// New route for deleting a user by ID

/**
 * Route for deleting a user profile.
 *
 * @name delete/deleteUser
 * @function
 * @memberof userProfileController
 * @inner
 * @param {string} path - The endpoint path.
 * @param {function} deleteUser - The controller function to handle deleting the user.
 */
userProfileController.delete("/deleteUser/:id", deleteUser);



// New route for updating user information

/**
 * Route for updating a user profile.
 *
 * @name put/updateUser
 * @function
 * @memberof userProfileController
 * @inner
 * @param {string} path - The endpoint path.
 * @param {function} updateUser - The controller function to handle updating the user.
 */
userProfileController.put("/updateUser/:id", updateUser); // Use PUT for updates
userProfileController.get("/getAllUsers", getAllUsers); // Use PUT for updates


module.exports = userProfileController;