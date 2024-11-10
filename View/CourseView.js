const CourseModel = require("../Model/CourseModel");

/**
 * Retrieves the details of a course based on the provided courseCode.
 * 
 * This function checks if the `courseCode` parameter is provided in the request,
 * queries the database for the course associated with the provided `courseCode`,
 * and returns the details of the course if found. If no course is found, or if the
 * `courseCode` parameter is missing, appropriate error messages are returned.
 *
 * @async
 * @function getCourseDetails
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send data or errors back to the client.
 * @returns {Promise<void>} A promise that resolves with the appropriate HTTP response status and message.
 * 
 * @throws {Error} If there is an issue with the database query, a 500 status is returned.
 * 
 * @example
 * // Example usage:
 * // GET /courses/:courseCode
 * app.get('/courses/:courseCode', getCourseDetails);
 * 
 * @example
 * // Expected response (successful case):
 * // Status: 200
 * // Response body:
 * // {
 * //   "message": "Course details retrieved successfully",
 * //   "courses": [
 * //     {
 * //       "courseCode": "CS101",
 * //       "courseName": "Introduction to Computer Science",
 * //       "credits": 3,
 * //       ...
 * //     }
 * //   ]
 * // }
 * 
 * @example
 * // Expected response (course not found):
 * // Status: 404
 * // Response body:
 * // {
 * //   "message": "Course not found"
 * // }
 * 
 * @example
 * // Expected response (missing courseCode parameter):
 * // Status: 400
 * // Response body:
 * // {
 * //   "message": "Bad Request: Missing courseCode parameter"
 * // }
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
