const ValidateModel = require("../Model/ValidateModel");

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


module.exports = {requestValidate};