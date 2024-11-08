const BatchModel = require("../Model/BatchModel");

/**
 * Asynchronously retrieves all batches from the database and sends them as a JSON response.
 *
 * @async
 * @function getAllBatch
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Returns a JSON response with all batches if successful, or an error message if an error occurs.
 * 
 * @throws {Error} - If there is an error retrieving the batches, a 500 status response is sent with an error message.
 */

const getAllBatch = async (req, res) => {
    try {
        const batches = await BatchModel.findAll();
        return res.status(200).json(batches);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


/**
 * Asynchronously creates a new batch in the database with the provided data and sends a JSON response.
 *
 * @async
 * @function createBatch
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing batch data.
 * @param {string} req.body.name - The name of the batch.
 * @param {string} req.body.email - The email associated with the batch.
 * @param {string} req.body.password - The password for the batch.
 * @param {string} req.body.session - The session information for the batch.
 * @param {string} req.body.profilePic - URL for the profile picture of the batch.
 * @param {string} req.body.coverPic - URL for the cover picture of the batch.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Sends a JSON response with the created batch data if successful, or an error message if an error occurs.
 *
 * @throws {Error} - Returns a 400 status if data is invalid, a 409 status if a batch already exists with the given email, or a 500 status for other errors.
 */

const createBatch = async (req, res) => {
    let data = req.body;

    const { name, email, password, session, profilePic, coverPic } = data;

    if (!name || !email || !password || !session || !profilePic || !coverPic) {
        return res.status(400).json({ message: 'Invalid data provided' });
    }

    try {
        const existingBatch = await BatchModel.findOne({ where: { email: email } });
        if (existingBatch) {
            return res.status(409).json({ message: "Batch already exists with this email." });
        }

        const batch = await BatchModel.create({
            name,
            email,
            password,
            session,
            profilePic,
            coverPic
        });
        return res.status(201).json({"data":batch,message: "Batch Create Sucesfully"});
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



const getBatchByName = async (req, res) => {
    
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: "Query parameter 'name' is required." });
        }

        const batches = await BatchModel.findAll({
            where: { name },
            attributes: { exclude: ['password','id','email'] }
        });

        if (batches.length === 0) {
            return res.status(404).json({ message: "No batches found with the specified name." });
        }

        if (batches[0].name !== name) {
            return res.status(404).json({ message: "Batch name does not match." });
        }

       

        return res.status(200).json(batches);
    } catch (error) {
        console.error(error);

        if (error instanceof DatabaseConnectionError) {
            return res.status(503).json({ message: "Database service is temporarily unavailable." });
        }

        if (error instanceof ExternalApiError) {
            return res.status(503).json({ message: "External API service is temporarily unavailable." });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getBatchByName };



module.exports = {getAllBatch,createBatch,getBatchByName};
