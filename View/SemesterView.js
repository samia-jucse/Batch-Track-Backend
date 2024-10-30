const SemesterModel = require("../Model/SemesterModel");
const { Op } = require("sequelize");

/**
 * Helper function to validate date format.
 * 
 * @param {string} dateString - The date string to validate.
 * @returns {boolean} - Returns true if the date is valid, false otherwise.
 */
const isValidDate = (dateString) => {
    return !isNaN(Date.parse(dateString));
};

/**
 * Handles the creation of a new semester in the batch management system.
 *
 * @async
 * @function createSemester
 * @param {Object} req - The request object containing semester details.
 * @param {Object} res - The response object to send feedback to the client.
 * @returns {Promise<Object>} - A JSON response with success or error message.
 *
 * @throws {Error} - If required fields are missing or if there is a database error.
 * 
 * @example
 * // Example request body:
 * {
 *   "semesterName": "Fall 2024",
 *   "startDate": "2024-09-01",
 *   "endDate": "2024-12-15",
 *   "relatedCourses": ["Math101", "CS202"]
 * }
 *
 * @example
 * // Example response on successful creation:
 * {
 *   "message": "Semester added successfully.",
 *   "data": {
 *     "id": 1,
 *     "semesterName": "Fall 2024",
 *     "startDate": "2024-09-01",
 *     "endDate": "2024-12-15",
 *     "relatedCourses": ["Math101", "CS202"],
 *     "createdAt": "2024-01-01T00:00:00.000Z",
 *     "updatedAt": "2024-01-01T00:00:00.000Z"
 *   }
 * }
 *
 * @example
 * // Example response for missing required fields:
 * {
 *   "message": "Missing required fields: semesterName, startDate, or endDate."
 * }
 *
 * @example
 * // Example response for invalid date format:
 * {
 *   "message": "Invalid date format for startDate or endDate."
 * }
 *
 * @example
 * // Example response for duplicate semester:
 * {
 *   "message": "Semester with this name already exists."
 * }
 *
 * @example
 * // Example response for overlapping dates:
 * {
 *   "message": "Semester dates overlap with an existing semester."
 * }
 */
const createSemester = async (req, res) => {
    const { semesterName, startDate, endDate, relatedCourses } = req.body;

    // Check for required fields
    if (!semesterName || !startDate || !endDate) {
        return res.status(400).json({ message: "Missing required fields: semesterName, startDate, or endDate." });
    }

    // Validate date format
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ message: "Invalid date format for startDate or endDate." });
    }

    try {
        // Check if a semester with the same name already exists
        const existingSemester = await SemesterModel.findOne({
            where: { semesterName }
        });

        if (existingSemester) {
            return res.status(409).json({ message: "Semester with this name already exists." });
        }

        // Check for overlapping dates
        const overlappingSemester = await SemesterModel.findOne({
            where: {
                startDate: { [Op.lte]: endDate },
                endDate: { [Op.gte]: startDate }
            }
        });

        if (overlappingSemester) {
            return res.status(409).json({ message: "Semester dates overlap with an existing semester." });
        }

        // Create a new semester if no conflicts are found
        const newSemester = await SemesterModel.create({
            semesterName,
            startDate,
            endDate,
            relatedCourses: JSON.stringify(relatedCourses) // Convert array to JSON if needed
        });

        return res.status(201).json({ message: "Semester added successfully.", data: newSemester });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add semester due to a server error." });
    }
};

module.exports = { createSemester };


