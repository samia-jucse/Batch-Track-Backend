const UserProfile = require("../Model/UserProfile");



const saveUser = async (req,res)=>{
    const batchId = 122;

    const {name,email,phone,homeDistrict,photo} = req.body;

    try{
        const userProfile = await UserProfile.create({
            name,email,phone,homeDistrict,photo
        });

        
        return res.status(201).json({message:"User is added successfullt",data:userProfile});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }

}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await UserProfile.destroy({
            where: { id: id }
        });

        if (result === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, homeDistrict, photo } = req.body; // Extract new user info from the request body

    try {
        // Find the user by ID and update the user profile
        const [updated] = await UserProfile.update(
            { name, email, phone, homeDistrict, photo },
            {
                where: { id: id }
            }
        );

        if (updated === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { saveUser, deleteUser, updateUser };

