const SemesterModel = require("../Model/SemesterModel");
const { Op } = require("sequelize");

const isValidDate = (dateString) => {
    return !isNaN(Date.parse(dateString));
};

const createSemester = async (req, res) => {
    const { semesterName, startDate, endDate, relatedCourses } = req.body;

    if (!semesterName || !startDate || !endDate) {
        return res.status(400).json({ message: "Missing required fields: semesterName, startDate, or endDate." });
    }

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ message: "Invalid date format for startDate or endDate." });
    }

    if (new Date(endDate) - new Date(startDate) < 15552000000) { // 5 months in milliseconds
        return res.status(400).json({ message: "End date must be at least 5 months after the start date." });
    }

    try {
        const existingSemester = await SemesterModel.findOne({
            where: { semesterName }
        });

        if (existingSemester) {
            return res.status(409).json({ message: "Semester with this name already exists." });
        }

        

        const newSemester = await SemesterModel.create({
            semesterName,
            startDate,
            endDate,
            relatedCourses: JSON.stringify(relatedCourses)
        });

        return res.status(201).json({ message: "Semester added successfully.", data: newSemester });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add semester due to a server error." });
    }
};

module.exports = { createSemester };


