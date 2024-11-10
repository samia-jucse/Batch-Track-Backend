const CourseModel = require("../Model/CourseModel");
/**
 * Retrieves the details of a course based on the provided courseId.
 * 
 * @async
 * @function getCourseDetails
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send data or errors back to the client.
 * @returns {Promise<void>} A promise that resolves with the appropriate HTTP response status and message.
 * 
 * @example
 * // Example usage:
 * // GET /courses/:courseId
 * app.get('/courses/:courseId', getCourseDetails);
 * 
 * @throws {Error} If the courseId is missing or the course cannot be found, an error response is returned.
 */
const getCourseDetails = async (req, res) => {
  const courseCode = req.params.courseCode; // Ensure you are capturing courseCode from the route

  if (!courseCode) {
    return res.status(400).json({
      message: "Bad Request: Missing courseCode parameter" // Correct the message here to 'courseCode'
    });
  }

  try {
    const course = await CourseModel.findOne({
      where: {
        courseCode: courseCode
      }
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    const courses = await CourseModel.findAll({
      where: {
        courseCode: courseCode
      }
    });

    return res.status(200).json({
      message: "Course details retrieved successfully",
      courses
    });

  } catch (error) {
    console.error('Error occurred:', error.message); // For debugging
    return res.status(500).json({
      message: "An error occurred while retrieving course details"
    });
  }
};

module.exports = { getCourseDetails };
