const courseResourceTestCases = [
    {
        id: 1,
        description: "Successful resource posting",
        mock: {
            findOne: { result: { id: "user-id", role: "class-representative" } },
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
        description: "Missing required fields",
        mock: {
            findOne: { result: { id: "user-id", role: "class-representative" } }
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
                message: "Missing courseCode, resourceTitle, resourceDescription, or resourceFile"
            }
        }
    },
    {
        id: 3,
        description: "Resource already posted",
        mock: {
            findOne: { result: { id: "user-id", role: "class-representative" } },
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
    },
    {
        id: 4,
        description: "Class Representative not logged in",
        mock: {
            findOne: { result: null } 
        },
        input: { 
            courseCode: "CS101", 
            resourceTitle: "Lecture Slides on Algorithms", 
            resourceDescription: "Slides covering basic sorting algorithms", 
            resourceFile: "algorithm_slides.pdf" 
        },
        expected: {
            status: 401,
            response: {
                message: "Unauthorized: You must be logged in as a Class Representative"
            }
        }
    }
];

module.exports = { courseResourceTestCases };
