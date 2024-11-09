const { CourseResourceModel } = require('../Model/CourseResourseModel');
const BatchModel = require('../Model/BatchModel');

const addResourse = async (req, res) => {
    const data = req.body;

    // Corrected variable names to match the test cases
    const { courseCode, resourceTitle, resourceDescription, resourceFile, email } = data;

    // Check for missing fields
    if (!courseCode || !resourceTitle || !resourceDescription || !resourceFile) {
        return res.status(400).json({ message: "Missing courseCode, resourceTitle, resourceDescription, or resourceFile" });
    }


        // Check if the resource already exists based on the resource file
        const existingResource = await CourseResourceModel.findOne({ where: { resourceFile } });
        if (existingResource) {
            return res.status(402).json({ message: "Already posted this resource" });
        } else {
            // Create a new course resource
            const resource = await CourseResourceModel.create({
                courseCode,
                resourceTitle,
                resourceDescription,
                resourceFile
            });
            return res.status(200).json({ data: resource, message: "Course resource posted successfully" });
        }
  
}

module.exports = { addResourse };
