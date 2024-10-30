const BatchModel = require("../Model/BatchModel");

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


module.exports = {getAllBatch,createBatch};
