const ValidateModel = require("../Model/ValidateModel");
const crypto = require('crypto');

const requestValidate = async (req, res) => {
    const email = req.headers['email'];
    console.log(email);
    try {
        const validateBatch = await ValidateModel.findOne({ where: { registerEmail: email } });

        if (!validateBatch) {
            const newValidate = await ValidateModel.create({
                registerEmail: email,
                registerCode: crypto.randomBytes(4).toString('hex'),
                loginCode: crypto.randomBytes(4).toString('hex'),
                registerStatus: false,
            });

            const id = newValidate.id;
            const regiHash = crypto.createHash("md5").update(id.toString()).digest("hex");
            const loginHash = crypto.createHash("md5").update(regiHash).digest("hex");

            await ValidateModel.update({
                registerCode: regiHash,
                loginCode: loginHash,
            }, {
                where: { id: id }
            });

            return res.status(200).json({ message: "Validate successful.", data: regiHash });
        } else {
            return res.status(409).json({ message: "This email already exists" });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const getAllValidateBatch = async (req, res) => {
    try{
        const validatedModels = await ValidateModel.findAll();
        return res.status(200).json({message:"All validate data",data: validatedModels});
    }catch(err){
        console.error("Error:", err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const getOneValidateBatch = async (req, res) => {
    const email = req.headers['email'];

    if (!email) {
        return res.status(400).json({ message: "Email header is required" });
    }

    try {
        const validatedModel = await ValidateModel.findOne({ where: { registerEmail: email } });

        if (!validatedModel) {
            return res.status(404).json({ message: "No validated batch found for the provided email." });
        }

        return res.status(200).json({ message: "Validated email found", data: validatedModel });
    } catch (err) {
        console.error("Error retrieving validated batch for email:", email, "Error:", err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}



module.exports = {requestValidate,getAllValidateBatch,getOneValidateBatch};