const UpdateProfileModel = require('../Model/UpdateProfileModel');



const updateProfile = async (req,res)=>{
    if (!req.body.data) {
        return res.status(400).json({ message: 'No data provided' });
    }
    let data = req.body;
    const { name, email, password,  details } = data;

    if (!name || !email || !password || !details ) {
        return res.status(400).json({ message: 'Invalid data provided' });
    }

    try {
        const existingStudent = await UpdateProfileModel.findOne({ where: { email: email } })
        if (existingStudent) {
            const updateStudent = await UpdateProfileModel.create({
                name,
                email,
                password,
                details
    
            });
            return res.status(201).json(updateStudent);
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

module.exports ={updateProfile};
