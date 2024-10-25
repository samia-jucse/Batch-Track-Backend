const SemesterModel = require("../Model/SemesterModel");

/**
 * Handles the creation of a new semester in the batch management system.
 * @param {Object} req - The request object containing semester details.
 * @param {Object} res - The response object to send feedback to the client.
 * @returns {Object} - A JSON response with success or error message.
 */
const createSemester = async (req, res) => {
    const { semesterName, startDate, endDate, relatedCourses } = req.body;

    try {
        // Check if a semester with the same name or date range already exists
        const existingSemester = await SemesterModel.findOne({
            where: {
                semesterName,
                startDate,
                endDate
            }
        });

        if (existingSemester) {
            return res.status(409).json({ message: "Semester with similar details already exists." });
        }

        // Create a new semester if no conflict is found
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
