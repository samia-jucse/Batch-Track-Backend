const { UUID } = require("sequelize");

const NoticeTestCases = [
    {
        id: 1,
        description: "Authorized user successfully sends notice",
        mock: {
            findUser: { result: { role: "Admin", departmentId: "dept1" } },
            createNotice: { result: { id: expect.any(String), title: "Meeting Notice" } }
        },
        input: {
            title: "Meeting Notice",
            content: "All faculty are requested to attend.",
            audienceType: "faculty",
            departmentId: "dept1",
        

          
        },
        expected: {
            status: 200,
            response: { 
                message: "Department notice sent successfully"
                
            }
        }
    },

    {
        id: 3,
        description: "Missing required fields",
        mock: {
            findUser: { result: { role: "Admin", departmentId: "dept1" } }
        },
        input: {
            title: "",
            content: "",
            audienceType: "",
            departmentId: "dept1",
            createdBy: "admin-user-id"
        },
        expected: {
            status: 400,
            response: { message: "Notice title, content, audience type, and department identifier are required" }
        }
    },
    {
        id: 4,
        description: "Database error during notice creation",
        mock: {
            findUser: { result: { role: "Admin", departmentId: "dept1" } },
            createNotice: { result: new Error("Database error") }  // Mocking the rejection
        },
        input: {
            title: "Meeting Notice",
            content: "All faculty are requested to attend.",
            audienceType: "faculty",
            departmentId: "dept1",
            createdBy: "admin-user-id"
        },
        expected: {
            status: 500,
            response: { message: "Failed to send the department notice. Please try again later" }
        }
    },

    {
        id: 5,
        description: "Notice creation with valid audience type 'Students'",
        mock: {
            findUser: { result: { role: "Admin", departmentId: "dept1" } },
            createNotice: { result: { id: "124", title: "New Semester Announcement" } }  // Simulating successful insert
        },
        input: {
            title: "New Semester Announcement",
            content: "The new semester starts next month.",
            audienceType: "Faculty",
            departmentId: "dept1",
            createdBy: "admin-user-id"
        },
        expected: {
            status: 200,
            response: { message: "Department notice sent successfully" }
        }
    },
    {
        id: 6,
        description: "Error when 'audienceType' exceeds maximum length",
        mock: {
            findUser: { result: { role: "Admin", departmentId: "dept1" } },
            createNotice: { result: new Error("Data truncated for column 'audienceType'") }  // Mocking data truncation error
        },
        input: {
            title: "Overlength Audience Type",
            content: "Content with overlength audience type.",
            audienceType: "A",
            departmentId: "dept1",
            createdBy: "admin-user-id"
        },
        expected: {
            status: 500,
            response: { message: "Failed to send the department notice. Please try again later" }
        }
    },
    {
        id: 7,
        description: "Error when 'audienceType' is null",
        mock: {
            findUser: { result: { role: "Admin", departmentId: "dept1" } },
            createNotice: { result: new Error("Column 'audienceType' cannot be null") }  // Mocking null error
        },
        input: {
            title: "Missing Audience Type",
            content: "Content without specifying audience type.",
            audienceType: null,
            departmentId: "dept1",
            createdBy: "admin-user-id"
        },
        expected: {
            status: 400,
            response: { message: "Notice title, content, audience type, and department identifier are required" }
        }
    },
    {
        id: 8,
        description: "Notice creation with valid audience type 'Admin Only'",
        mock: {
            findUser: { result: { role: "Admin", departmentId: "dept6" } },
            createNotice: { result: { id: "127", title: "Admin Meeting Notice" } }  // Simulating successful insert
        },
        input: {
            title: "Admin Meeting Notice",
            content: "Meeting for all department admins.",
            audienceType: "Admin Only",
            departmentId: "dept6",
            createdBy: "admin-user-id"
        },
        expected: {
            status: 200,
            response: { message: "Department notice sent successfully" }
        }
    }
    
    
    
    
];

 module.exports = { NoticeTestCases };
