const BatchModel = require("../Model/BatchModel");



const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Bad Request: Missing email or password" });
    }

    try {

        const batch = await BatchModel.findOne({ where: { email: email } });


        if (!batch) {
            return res.status(404).json({ message: "User not found", data: null });
        }

        if (batch.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.status(200).json({ message: "Login success", data: batch });
    } catch (error) {
        // console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




module.exports = {login};