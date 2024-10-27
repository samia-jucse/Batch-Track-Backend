// controllers/NoticeController.js
const NoticeModel = require("../Model/NoticeModel");
const crypto = require('crypto');

const handleNotice = async (req, res) => {
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
module.exports = { handleNotice };
