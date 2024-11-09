const courseResourceTestCases = [
  {
      id: 1,
      description: "Successful resource posting",
      mock: {
          findOne: { result: { id: "user-id", role: "class-representative" } },
          validate: { result: { registerEmail: "cruser@example.com", loginCode: "ValidLoginCode" } },
          save: { result: { courseCode: "CS101", resourceTitle: "Lecture Slides on Algorithms", resourceDescription: "Slides covering basic sorting algorithms", resourceFile: "algorithm_slides.pdf" } }
      },
      input: { 
          courseCode: "CS101", 
          resourceTitle: "Lecture Slides on Algorithms", 
          resourceDescription: "Slides covering basic sorting algorithms", 
          resourceFile: "algorithm_slides.pdf" 
      },
      expected: {
          status: 200,
          response: {
              message: "Course resource posted successfully",
              data: {
                  courseCode: "CS101",
                  resourceTitle: "Lecture Slides on Algorithms",
                  resourceDescription: "Slides covering basic sorting algorithms",
                  resourceFile: "algorithm_slides.pdf"
              }
          }
      }
  },
  {
      id: 2,
      description: "Missing required fields (courseCode, resourceTitle, and resourceDescription)",
      mock: {
          findOne: { result: { id: "user-id", role: "class-representative" } },
          validate: { result: { registerEmail: "cruser@example.com", loginCode: "ValidLoginCode" } }
      },
      input: { 
          courseCode: "", 
          resourceTitle: "", 
          resourceDescription: "", 
          resourceFile: "algorithm_slides.pdf" 
      },
      expected: {
          status: 400,
          response: {
              message: "Bad Request: Missing courseCode, resourceTitle or resourceDescription"
          }
      }
  },
  {
      id: 3,
      description: "Resource already posted",
      mock: {
          findOne: { result: { id: "user-id", role: "class-representative" } },
          validate: { result: { registerEmail: "cruser@example.com", loginCode: "ValidLoginCode" } },
          existingResource: { result: { resourceFile: "algorithm_slides.pdf" } }
      },
      input: { 
          courseCode: "CS101", 
          resourceTitle: "Lecture Slides on Algorithms", 
          resourceDescription: "Slides covering basic sorting algorithms", 
          resourceFile: "algorithm_slides.pdf" 
      },
      expected: {
          status: 402,
          response: {
              message: "Already posted this resource"
          }
      }
  }
];




module.exports = {courseResourceTestCases};
