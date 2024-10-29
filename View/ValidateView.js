// Import the ValidateModel from the Model directory, used to interact with the database for validation records.
const ValidateModel = require("../Model/ValidateModel");

// Import the crypto module to generate secure random codes and hashes for validation purposes.
const crypto = require('crypto');

/**
 * Asynchronously handles the email validation request.
 * If the email is not yet validated in the database, it generates a registration and login code,
 * stores them, and sends the registration code as a response.
 *
 * @async
 * @function requestValidate
 * @param {Object} req - Express request object, containing headers with an email.
 * @param {Object} res - Express response object for sending the HTTP response.
 */
const requestValidate = async (req, res) => {
    // Extract the 'email' from request headers for validation checking.
    const email = req.headers['email'];

    // Begin a try block to handle potential errors that might occur during the database interaction.
    try {
        // Find an existing record in the ValidateModel table where the email matches the provided email.
        const validateBatch = await ValidateModel.findOne({ where: { registerEmail: email } });

        // If no matching validation record exists in the database:
        if (!validateBatch) {
            // Create a new validation record with the provided email and random registration/login codes.
            const newValidate = await ValidateModel.create({
                // Set the registerEmail field to the email extracted from the headers.
                registerEmail: email,

                // Generate a random 4-byte hex string as the initial registration code.
                registerCode: crypto.randomBytes(4).toString('hex'),

                // Generate a random 4-byte hex string as the initial login code.
                loginCode: crypto.randomBytes(4).toString('hex'),

                // Set the registerStatus to false, indicating it’s not yet validated.
                registerStatus: false,
            });

            // Retrieve the unique identifier (ID) of the newly created record from the database.
            const id = newValidate.id;

            // Create an MD5 hash of the ID to use as the finalized registration code.
            const regiHash = crypto.createHash("md5").update(id.toString()).digest("hex");

            // Create a second MD5 hash from the first hash to use as the finalized login code.
            const loginHash = crypto.createHash("md5").update(regiHash).digest("hex");

            // Update the newly created record in the database, setting the finalized registerCode and loginCode.
            await ValidateModel.update({
                registerCode: regiHash, // Set registerCode field to the generated MD5 hash (regiHash).
                loginCode: loginHash,   // Set loginCode field to the second MD5 hash (loginHash).
            }, {
                where: { id: id } // Find the record by its ID and update it.
            });

            // Respond to the client with a success message and the finalized register code.
            return res.status(200).json({ message: "Validate successful.", data: regiHash });
        } else {
            // If a validation record already exists for this email, send a conflict response.
            return res.status(409).json({ message: "This email already exists" });
        }

        // Catch any errors that may occur during the validation process.
    } catch (err) {
        // Send a 500 status code with an error message if an error occurs.
        return res.status(500).json({ message: "Something went wrong" });
    }
};

/**
 * Asynchronously retrieves all validation records in the database.
 * Sends the retrieved data as a JSON response.
 *
 * @async
 * @function getAllValidateBatch
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object for sending the HTTP response.
 */
const getAllValidateBatch = async (req, res) => {
    // Begin a try block to handle errors during the database retrieval process.
    try {
        // Fetch all records from the ValidateModel table.
        const validatedModels = await ValidateModel.findAll();

        // Respond to the client with a success message and the data retrieved from the database.
        return res.status(200).json({ message: "All validate data", data: validatedModels });
    } catch (err) {
        // Log the error to the console for debugging purposes.
        console.error("Error:", err);

        // Send a 500 status code with an error message if an error occurs.
        return res.status(500).json({ message: "Something went wrong" });
    }
}

/**
 * Asynchronously retrieves a specific validation record by email from the database.
 * Sends the retrieved data as a JSON response.
 *
 * @async
 * @function getOneValidateBatch
 * @param {Object} req - Express request object containing headers with an email.
 * @param {Object} res - Express response object for sending the HTTP response.
 */
const getOneValidateBatch = async (req, res) => {
    // Extract the 'email' from request headers for lookup in the database.
    const email = req.headers['email'];

    // Check if the email is provided; if not, respond with a 400 status code and error message.
    if (!email) {
        return res.status(400).json({ message: "Email header is required" });
    }

    // Begin a try block to handle errors during the database lookup process.
    try {
        // Find a single validation record in the ValidateModel table where the email matches the provided email.
        const validatedModel = await ValidateModel.findOne({ where: { registerEmail: email } });

        // If no record is found for the email:
        if (!validatedModel) {
            // Respond with a 404 status code indicating no data was found.
            return res.status(404).json({ message: "No validated batch found for the provided email." });
        }

        // If the record is found, respond with a success message and the data.
        return res.status(200).json({ message: "Validated email found", data: validatedModel });
    } catch (err) {
        // Log the error to the console for debugging purposes, including the email causing the error.
        console.error("Error retrieving validated batch for email:", email, "Error:", err);

        // Send a 500 status code with an error message if an error occurs.
        return res.status(500).json({ message: "Something went wrong" });
    }
}

// Export the requestValidate, getAllValidateBatch, and getOneValidateBatch functions
// for use in other parts of the application.
module.exports = { requestValidate, getAllValidateBatch, getOneValidateBatch };


