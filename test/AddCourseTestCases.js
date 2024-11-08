const courseTestCases = [
    {
      id: 1,
      description: "Successful course addition",
      mock: {
        findOne: { result: { id: "user-id", role: "class-representative" } },
        validate: { result: { registerEmail: "cruser@example.com", loginCode: "ValidLoginCode" } },
        save: { 
          result: { 
            courseCode: "CS101", 
            courseName: "Introduction to Algorithms", 
            courseHours: 3, 
            courseCredit: 3, 
            prerequisites: "None", 
            courseTeacher: "Dr. Smith" 
          } 
        }
      },
      input: { 
        courseCode: "CS101", 
        courseName: "Introduction to Algorithms", 
        courseHours: 3, 
        courseCredit: 3, 
        prerequisites: "None", 
        courseTeacher: "Dr. Smith" 
      },
      expected: {
        status: 200,
        response: {
          message: "Course added successfully",
          data: {
            courseCode: "CS101",
            courseName: "Introduction to Algorithms",
            courseHours: 3,
            courseCredit: 3,
            prerequisites: "None",
            courseTeacher: "Dr. Smith"
          }
        }
      }
    }
];

module.exports = courseTestCases;
