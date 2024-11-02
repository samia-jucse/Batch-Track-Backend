const { all } = require("../Controller/UserController");
const UserProfile = require("../Model/UserProfile");


/**
 * @module UserView
 */

/**
 * Save a user profile to the database.
 *
 * @async
 * @function saveUser
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing user information.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.phone - The phone number of the user.
 * @param {string} req.body.homeDistrict - The home district of the user.
 * @param {string} req.body.photo - The URL of the user's photo.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Returns a promise that resolves when the user is saved.
 */
const saveUser = async (req,res)=>{
    const batchId = 122;

    const {name,email,phone,homeDistrict,photo} = req.body;

    try{
        const userProfile = await UserProfile.create({
            name,email,phone,homeDistrict,photo
        });

        
        return res.status(201).json({message:"User is added successfully",data:userProfile});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }

}





/**
 * Delete a user profile from the database.
 *
 * @async
 * @function deleteUser
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user to delete.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Returns a promise that resolves when the user is deleted.
 */



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






/**
 * Update a user profile in the database.
 *
 * @async
 * @function updateUser
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {Object} req.body - The request body containing updated user information.
 * @param {string} [req.body.name] - The updated name of the user.
 * @param {string} [req.body.email] - The updated email of the user.
 * @param {string} [req.body.phone] - The updated phone number of the user.
 * @param {string} [req.body.homeDistrict] - The updated home district of the user.
 * @param {string} [req.body.photo] - The updated URL of the user's photo.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Returns a promise that resolves when the user is updated.
 */

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


const getAllUsers = async (req,res)=>{
    try{
        const allUser = await UserProfile.findAll();
        res.status(200).json({message:"All user here",allUser:allUser});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}



module.exports = { saveUser, deleteUser, updateUser , getAllUsers};

