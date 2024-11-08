const courseResourceTestCases = [
    {
      id: 1,
      description: "Successful resource posting",
      mock: {
        findOne: { result: { id: "user-id", role: "class-representative" } },
        validate: { result: { registerEmail: "cruser@example.com", loginCode: "ValidLoginCode" } },
        save: { result: { courseCode: "CS101", resourseTitle: "Lecture Slides on Algorithms", resourseDescription: "Slides covering basic sorting algorithms", resoursefile: "algorithm_slides.pdf" } }
      },
      input: { 
        courseCode: "CS101", 
        resourseTitle: "Lecture Slides on Algorithms", 
        resourseDescription: "Slides covering basic sorting algorithms", 
        resoursefile: "algorithm_slides.pdf" 
      },
      expected: {
        status: 200,
        response: {
          message: "Course resource posted successfully",
          data: {
            courseCode: "CS101",
            resourseTitle: "Lecture Slides on Algorithms",
            resourseDescription: "Slides covering basic sorting algorithms",
            resoursefile: "algorithm_slides.pdf"
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
        fileUpload: "algorithm_slides.pdf" 
      },
      expected: {
        status: 400,
        response: {
          message: "Bad Request: Missing courseCode, resourceTitle or resourceDescription"
        }
      }
    },
    //   {
    //   id: 3,
    //   description: "Database failure while saving resource",
    //   mock: {
    //     findOne: { result: { id: "user-id", role: "class-representative" } },
    //     validate: { result: { registerEmail: "cruser@example.com", loginCode: "ValidLoginCode" } },
    //     save: { result: Promise.reject(new Error("Database error")) }
    //   },
    //   input: { 
    //     courseCode: "CS101", 
    //     resourceTitle: "Lecture Slides on Algorithms", 
    //     resourceDescription: "Slides covering basic sorting algorithms", 
    //     fileUpload: "algorithm_slides.pdf" 
    //   },
    //   expected: {
    //     status: 500,
    //     response: {
    //       message: "Internal Server Error"
    //     }
    //   }
    // },
    
];


module.exports = courseResourceTestCases;
