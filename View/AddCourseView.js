const CourseModel = require('../Model/CourseModel');

const addCourse = async (req, res) => {
  try {
    const data = req.body;
    const { courseCode, courseName, courseHours, courseCredit, prerequisites, courseTeacher } = data;

    // Create a new course in the database
    const course = await CourseModel.create({
      courseCode,
      courseName,
      courseHours,
      courseCredit,
      prerequisites,
      courseTeacher
    });

    return res.status(200).json({ data: course, message: "Course added successfully" });
  } catch (error) {
    console.error("Error adding course:", error);
    return res.status(500).json({ message: "Failed to add course" });
  }
};

module.exports = { addCourse };



