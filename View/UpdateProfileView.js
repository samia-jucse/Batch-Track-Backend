const UpdateProfileModel = require('../Model/UpdateProfileModel');



const updateProfile = async (req,res)=>{
    if (!req.body) {
        return res.status(400).json({ message: 'No data provided' });
    }
    let data = req.body;
    const { name, email, phone, homeDisrict,photo } = data;

    if ( !name || !email || !phone || !homeDisrict || !photo ) {
        return res.status(400).json({ message: 'Invalid data provided' });
    }

    try {
        const existingStudent = await UpdateProfileModel.findOne({ where: { email: email } })
        if (existingStudent) {
            const updateStudent = await UpdateProfileModel.create({
                name, email, phone,  homeDisrict,photo
            });
            return res.status(201).json({message:"Update successful.",data:updateStudent});
        }
        else {
            return res.status(409).json({ message: "Please valid Email" });
        }

      
    }
    catch (error) {
     console.error(err);
     return res.status(500).json({error :"Internal Server Error"});
    }

}

module.exports = updateProfile;
