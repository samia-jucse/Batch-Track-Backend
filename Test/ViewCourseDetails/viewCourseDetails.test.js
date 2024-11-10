const getCourseDetailsTestCases = require('./viewCourseDetailsTestCases');
const { getCourseDetails } = require('../../View/CourseView');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const CourseModel = require('../../Model/CourseModel');

// Mocking the findCourseById function
jest.mock('../../Model/CourseModel', () => ({
    findOne: jest.fn(),
}));

describe('getCourseDetails function - Parameter Validation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    getCourseDetailsTestCases.forEach(({ description, mock, input, expected }) => {
        it(description, async () => {
            const req = mockRequest({ params: input });
            const res = mockResponse();

            // Apply mock implementation based on the test case
            if (mock && mock.findOne) {
               return mock.findOne.result;
            }

            // Call the function under test
            await getCourseDetails(req, res);

            // Verify the status and response
            expect(res.status).toHaveBeenCalledWith(expected.status);
        });
    });
});
