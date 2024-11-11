const  CourseResourceModel =require("../Model/CourseResourseModel");
const BatchModel = require('../Model/BatchModel');

const addResourse = async (req, res) => {
    let data = req.body;  


    const { courseCode, resourceTitle, resourceDescription, resourceFile, email } = data;
  
       try{
        const existingClassRepresentative = await BatchModel.findOne({where : {email}});
        if(existingClassRepresentative)
        {
            if (!courseCode || !resourceTitle || !resourceDescription || !resourceFile) {
                return res.status(400).json({ message: "Missing courseCode, resourceTitle, resourceDescription, or resourceFile" });
            }
    
    
            const existingResource = await CourseResourceModel.findOne({ where: { resourceFile } });
            if (existingResource) {
                return res.status(402).json({ message: "Already posted this resource" });
            } 
              
            const resource = await CourseResourceModel.create({
                    courseCode,
                    resourceTitle,
                    resourceDescription,
                    resourceFile
                });
                return res.status(200).json({ data: resource, message: "Course resource posted successfully" });
        }

          return res.status(401).json({ message: " You must be logged in as a Class Representative" });
       }

       catch(error){
        return res.status(500).json({ message: "Internal server error" });
       }
      
            
  
}

module.exports = { addResourse };
