const CourseModel = require('../Model/CourseModel');

const addCourse = async (req, res) => {
  try {
    const data = req.body;
    const { courseCode, courseName, courseHours, courseCredit, prerequisites, courseTeacher } = data;
    
    if (!courseCode || courseCode.trim() === "") {
        return res.status(400).json({ message: "Course code is required", data: null });
      }

      if (!courseName || courseName.trim() === "") {
        return res.status(400).json({ message: "Course name is required", data: null });
      }

      if (!courseHours || isNaN(courseHours) || parseInt(courseHours) <= 1) {
        return res.status(400).json({ message: "Invalid course hours", data: null });
      }
      if (!courseTeacher || courseTeacher.trim() === "") {
        return res.status(400).json({ message: "Course teacher is required", data: null });
      }
      if (!courseCredit || isNaN(courseCredit) || parseInt(courseCredit) <= 0) {
        return res.status(400).json({ message: "Invalid course credit", data: null });
      }
      if (prerequisites && prerequisites.length > 255) {
        return res.status(400).json({ message: "Prerequisites too long", data: null });
      }
      if (courseCredit < 1 || courseCredit > 6) {
        return res.status(400).json({ message: "Course credit should be between 1 and 6", data: null });
      }
      const courseCodePattern = /^[A-Za-z]{2,4}\d{3,4}$/;
    if (!courseCodePattern.test(courseCode)) {
      return res.status(400).json({ message: "Invalid course code format", data: null });
    }
      if (courseHours > 5) {
        return res.status(400).json({ message: "Course hours cannot exceed 5 hours per week", data: null });
      }
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



