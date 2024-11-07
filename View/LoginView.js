const BatchModel = require("../Model/BatchModel");
const ValidateModel = require("../Model/ValidateModel");

/**
 * Handles user login requests.
 *
 * @async
 * @function login
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object used to send responses to the client.
 * @returns {Promise<void>} - A promise that resolves to void.
 *
 * @throws {Error} Will respond with an error if the login process fails.
 *
 * @example
 * // Sample request body:
 * // {
 * //   "email": "user@example.com",
 * //   "password": "userpassword"
 * // }
 */

// Define the login function to handle user login requests
const login = async (req, res) => {
    // Destructure email and password from the request body
    const { email, password,secret } = req.body;

    console.log("Email " + email);
    console.log("Password " + password);

    // Check if both email and password are provided
    if (!email || !password || !secret) {
        // Respond with a 400 Bad Request if either is missing
        return res.status(400).json({ message: "Bad Request: Missing email or password" });
    }

    try {
        // Attempt to find a user (batch) in the database with the provided email
        const batch = await BatchModel.findOne({ where: { email: email } });

        // If no user is found, respond with a 404 Not Found
        if (!batch) {
            return res.status(404).json({ message: "User not found", data: null });
        }

        // Check if the provided password matches the user's password
        if (batch.password !== password) {
            // Respond with a 401 Unauthorized if the password is invalid
            return res.status(401).json({ message: "Invalid password" });
        }

        // Find valid registered user for login
        const validate = await ValidateModel.findOne({ where: { registerEmail: email } });

        console.log("validate ", validate);

        // Check this user is valid
        if (!validate) {
            return res.status(405).json({ message: "Your email is not validated" });
        }

        // Check the login secret of this user
        if(validate.loginCode !== secret){
            return res.status(406).json({ message: "Invalid login code" });
        }
        // If login is successful, respond with a 200 OK and the user data
        return res.status(200).json({ message: "Login success", data: batch });
    } catch (error) {
        // Handle any unexpected errors and respond with a 500 Internal Server Error
        // console.error("Login Error:", error); // Uncomment for error logging
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Export the login function for use in other parts of the application
module.exports = { login };
