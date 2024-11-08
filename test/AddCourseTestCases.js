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
,
{
    id: 2,
    description: "Course addition with missing courseCode",
    mock: {
      findOne: { result: { id: "user-id", role: "class-representative" } },
      validate: { result: { registerEmail: "cruser@example.com", loginCode: "ValidLoginCode" } },
      save: null  // Simulating that save should not occur due to missing courseCode
    },
    input: {
      courseCode: "",  // Empty courseCode to simulate an error
      courseName: "Operating Systems",
      courseHours: 3,
      courseCredit: 3,
      prerequisites: "None",
      courseTeacher: "Dr. Lee"
    },
    expected: {
      status: 400,  // Bad Request due to missing courseCode
      response: {
        message: "Course code is required",
        data: null
      }
    }
  }
,
{
    id: 3,
    description: "Course addition with missing courseName",
    mock: {
      findOne: { result: { id: "user-id", role: "class-representative" } },
      validate: { result: { registerEmail: "cruser@example.com", loginCode: "ValidLoginCode" } },
      save: null  // Simulating that save should not occur due to missing courseName
    },
    input: { 
      courseCode: "CS103", 
      courseName: "",  // Empty courseName to simulate an error
      courseHours: 3, 
      courseCredit: 3, 
      prerequisites: "Basic Programming", 
      courseTeacher: "Dr. White" 
    },
    expected: {
      status: 400,  // Bad Request due to missing courseName
      response: {
        message: "Course name is required",
        data: null
      }
    }
  }
,
{
    id: 4,
    description: "Course addition with invalid courseHours",
    mock: {
      findOne: { result: { id: "user-id", role: "class-representative" } },
      validate: { result: { registerEmail: "cruser@example.com", loginCode: "ValidLoginCode" } },
      save: null  // Simulating that save should not occur due to invalid courseHours
    },
    input: { 
      courseCode: "CS104", 
      courseName: "Data Structures", 
      courseHours: "abc",  // Invalid courseHours (non-numeric value)
      courseCredit: 3, 
      prerequisites: "None", 
      courseTeacher: "Dr. Brown" 
    },
    expected: {
      status: 400,  // Bad Request due to invalid courseHours
      response: {
        message: "Invalid course hours",
        data: null
      }
    }
  }
,  
    {
        id: 5,
        description: "Course addition with missing courseTeacher",
        mock: {
          findOne: { result: { id: "user-id", role: "class-representative" } },
          validate: { result: { registerEmail: "cruser@example.com", loginCode: "ValidLoginCode" } },
          save: null  // Simulating that save should not occur due to missing courseTeacher
        },
        input: { 
          courseCode: "CS105", 
          courseName: "Operating Systems", 
          courseHours: 3, 
          courseCredit: 3, 
          prerequisites: "Basic Programming", 
          courseTeacher: ""  // Empty courseTeacher
        },
        expected: {
          status: 400,  // Bad Request due to missing courseTeacher
          response: {
            message: "Course teacher is required",
            data: null
          }
        }
      },

      
      
      
];

module.exports = courseTestCases;
