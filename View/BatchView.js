const BatchModel = require("../Model/BatchModel");

const getallBatch = async (req, res) => {
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
    console.log(data);
    
    if (!req.body) {
        return res.status(400).json({ message: 'No data provided' });
    }
    const { name, email, password, session, profileimage, coverimage } = data;

    if (!name || !email || !password || !session || !profileimage || !coverimage) {
        return res.status(400).json({ message: 'Invalid data provided' });
    }

    try {
        const existingBatch = await BatchModel.findOne({ where: { email: email } })
        if (existingBatch) {
            return res.status(409).json({ message: "Batch already exists with this email." });
        }

        const batch = await BatchModel.create({
            name,
            email,
            password,
            session,
            profileimage,
            coverimage

        });
        return res.status(201).json(batch);
    }
    catch (error) {
     console.error(err);
     return res.status(500).json({error :"Internal Server Error"});
    }

};

module.exports = {getallBatch,createBatch};