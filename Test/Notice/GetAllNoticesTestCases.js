const getAllNoticesTestCases = [
    {
        id: 'successCase',
        description: 'Should return a list of notices with status 200',
        mockData: [
            {
                id: 'notice1',
                title: 'Meeting Notice',
                content: 'All faculty are requested to attend.',
                audienceType: 'faculty',
                departmentId: 'dept1',
                createdBy: 'admin-user-id',
                timestamp: '2024-11-12T17:50:54.568Z',
            },
            {
                id: 'notice2',
                title: 'Exam Notice',
                content: 'Final exams are scheduled for next week.',
                audienceType: 'students',
                departmentId: 'dept2',
                createdBy: 'admin-user-id',
                timestamp: '2024-11-12T17:50:54.568Z',
            },
        ],
        expectedOutput: {
            status: 200,
            response: {
                
                message: "Notices retrieved successfully",
                notices: [
                    {
                        id: "notice1",
                        title: "Meeting Notice",
                        content: "All faculty are requested to attend.",
                        audienceType: "faculty",
                        departmentId: "dept1",
                        createdBy: "admin-user-id",
                        timestamp: '2024-11-12T17:50:54.568Z',
                    },
                    {
                        id: "notice2",
                        title: "Exam Notice",
                        content: "Final exams are scheduled for next week.",
                        audienceType: "students",
                        departmentId: "dept2",
                        createdBy: "admin-user-id",
                        timestamp: '2024-11-12T17:50:54.568Z',
                    }
                ]
            }
        }
    },
    {
        id: 'emptyCase',
        description: 'Should return an empty list when there are no notices',
        mockData: [],
        expectedOutput: {
            status: 200,
            response: {
                message: "Notices retrieved successfully",
                notices:[]
            }
        }
    },
    {
        id: 'errorCase',
        description: 'Should return 500 status code and error message when retrieval fails',
        mockData: null, // This will trigger an error
        expectedOutput: {
            status: 500,
            response: {
                message: 'Failed to retrieve notices'
                
            }
        }
    }
];

module.exports = getAllNoticesTestCases;
