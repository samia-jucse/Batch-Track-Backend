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
    }
];


module.exports = courseResourceTestCases;
