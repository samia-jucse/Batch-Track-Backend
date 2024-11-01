const BatchModel = require("../Model/BatchModel");

/**
 * Updates a batch's information based on the batch ID provided in the request header.
 * 
 * @async
 * @function updateBatch
 * @param {Object} req - The request object.
 * @param {Object} req.headers - The headers from the client request.
 * @param {string} req.headers.batch-id - The ID of the batch to update.
 * @param {Object} req.body - The body of the client request containing the update data.
 * @param {string} req.body.name - The new name for the batch.
 * @param {string} req.body.email - The new email for the batch.
 * @param {string} req.body.password - The new password for the batch.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} JSON response with a success or error message.

 */


const getBatchById = async (req, res) => {
    const batchID = req.headers['id'];

    try {
        const batch = await BatchModel.findByPk(batchID);

        if (batch) {
            return res.status(200).json({ batch });
        }
        return res.status(404).json({ message: "Batch not found." });
        
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};



const updateBatch = async (req, res) => {
    const batchId = req.headers['id'];
    const { name, email, password } = req.body;
    
    try {
        const batch = await BatchModel.findByPk(batchId);
        
        if (batch) {
            const updatedBatch = await BatchModel.update({
                name: name,
                email: email,
                password: password
            }, { where: { id: batchId } });
            
            return res.status(200).json({ message: "Update successful.", data: updatedBatch });
        }
        
        return res.status(404).json({ message: "Batch not found." });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};



module.exports = { updateBatch , getBatchById};