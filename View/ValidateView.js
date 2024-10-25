const ValidateModel = require("../Model/ValidateModel");


const crypto = require("crypto");

const requestValidate = async (req, res) => {
    const email = req.headers['email'];
    console.log(email);

    try {
        const validateBatch = await ValidateModel.findOne({ where: { registerEmail: email } });

        if (!validateBatch) {
            // Create a new entry with temporary codes
            const newValidate = await ValidateModel.create({
                registerEmail: email,
                registerCode: crypto.randomBytes(4).toString('hex'),  // Unique initial value
                loginCode: crypto.randomBytes(4).toString('hex'),    // Unique initial value
                registerStatus: false,
            });

            const id = newValidate.id;
            const regiHash = crypto.createHash("md5").update(id.toString()).digest("hex");
            const loginHash = crypto.createHash("md5").update(regiHash).digest("hex");

            await ValidateModel.update({
                registerCode: regiHash,
                loginCode: loginHash,
            }, {
                where: { id: id }  // Update the correct entry
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


module.exports = {requestValidate};