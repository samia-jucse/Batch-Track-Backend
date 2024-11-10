const  CourseResourceModel =require("../Model/CourseResourseModel");
const BatchModel = require('../Model/BatchModel');

const addResourse = async (req, res) => {
    const data = req.body;  


    const { courseCode, resourceTitle, resourceDescription, resourceFile, email } = data;
  
  

    if (!courseCode || !resourceTitle || !resourceDescription || !resourceFile) {
        return res.status(400).json({ message: "Missing courseCode, resourceTitle, resourceDescription, or resourceFile" });
    }

        
        
       try{


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


      


       catch(error){
           console.log(error);
       }
      
            
  
}

module.exports = { addResourse };
