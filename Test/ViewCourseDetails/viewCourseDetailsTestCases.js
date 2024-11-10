const getCourseDetailsTestCases = [
  {
    description: 'Course not found',
    mock: {
      findOne: {
        result: null, 
      }
    },
    input: { },
    expected: {
      status: 400,
      response: { message: "Course not found" }
    }
  },  
  {
    description: 'Valid courseId provided',
    mock: {
      findOne: {
        result: { id: 'valid-id', name: 'Course Name' }, // Simulate valid course found
      }
    },
    input: { courseId: 'valid-id' },
    expected: {
      status: 200,
      response: { message: "Course details retrieved successfully" }
    }
  },  

  {
    id: 3,
    description: "Course not found",
    mock: {
      findOne: { 
        result: null 
      },  
    },
    input: { courseId: "nonexistent-course" },
    expected: {
      status: 404,
      response: { message: "Course not found" },
    },
  },
  {
    id: 4,
    description: "Database error while retrieving course",
    mock: {
      findOne: { 
        result: jest.fn().mockRejectedValue(new Error("Database error")) 
      },  
    },
    input: { courseId: "course123" },
    expected: {
      status: 500,
      response: { message: "An error occurred while retrieving course details" },
    },
  },
];

module.exports = getCourseDetailsTestCases;
