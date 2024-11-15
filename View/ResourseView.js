const  CourseResourceModel =require("../Model/CourseResourseModel");
const BatchModel = require('../Model/BatchModel');

/**
 * Handles adding a new course resource to the system.
 *
 * This function validates the input data, ensures the user is a Class Representative (CR),
 * checks for duplicate resources, and saves the new resource to the database if all conditions are met.
 * 
 * @async
 * @function addResourse
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing the resource data.
 * @param {string} req.body.courseCode - The course code associated with the resource.
 * @param {string} req.body.resourceTitle - The title of the resource.
 * @param {string} req.body.resourceDescription - A brief description of the resource.
 * @param {string} req.body.resourceFile - The filename or unique identifier for the resource file.
 * @param {string} req.body.email - The email address of the user (Class Representative).
 * @param {Object} res - The HTTP response object.
 * @returns {Object} JSON response with the following status codes:
 *
 * @throws {Error} If an unexpected error occurs during database operations.
 *
 */

const addResourse = async (req, res) => {
    let data = req.body;  

    const { courseCode, resourceTitle, resourceDescription, resourceFile, email } = data;

    
    try{
        const existingClassRepresentative = await BatchModel.findOne({where : {email}});
        if(existingClassRepresentative)
        {
            if (!courseCode || !resourceTitle || !resourceDescription || !resourceFile) {
                return res.status(400).json({ message: "Missing any field " });
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

          return res.status(401).json({ message: "You must be logged in as a Class Representative" });
       }
       
       catch(error){
        return res.status(500).json({ message: "Internal server error" });
       }
      
            
  
}

module.exports = { addResourse };