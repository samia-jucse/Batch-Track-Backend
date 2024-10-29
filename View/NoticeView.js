// controllers/NoticeController.js
const NoticeModel = require("../Model/NoticeModel");

/**
 * Creates a new notice if it does not already exist.
 *
 * @async
 * @function createNotice
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.title - Title of the notice.
 * @param {string} req.body.description - Description of the notice.
 * @param {string} req.body.author - Author of the notice.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Returns a JSON response with a message and data or error.
 */
const createNotice = async (req, res) => {
    const { title, description, author } = req.body;

    try {
        const existingNotice = await NoticeModel.findOne({ where: { title } });

        if (!existingNotice) {
            const newNotice = await NoticeModel.create({
                title,
                description,
                author,
            });

            return res.status(201).json({ message: "Notice created successfully.", data: newNotice });
        } else {
            return res.status(409).json({ message: "This notice already exists" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

/**
 * Retrieves all notices ordered by creation date in descending order.
 *
 * @async
 * @function getAllNotices
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Returns a JSON response with all notices or an error message.
 */
const getAllNotices = async (req, res) => {
    try {
        const notices = await NoticeModel.findAll({
            order: [['createdAt', 'DESC']] 
        });

        if (notices.length > 0) {
            return res.status(200).json({ data: notices });
        } else {
            return res.status(404).json({ message: "No notices found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { createNotice, getAllNotices };
