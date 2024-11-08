const CourseModel = require('../Model/CourseModel');
const { addCourse } = require("../View/AddCourseView");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const courseTestCases = require("./AddCourseTestCases");
const debug = require('debug')('batchtrackbackend');

jest.mock('../Model/CourseModel', () => ({
    create: jest.fn(),
}));

const { create: createCourse } = require('../Model/CourseModel');

describe('addCourse function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    debug("Before running test cases");
    courseTestCases.forEach(({ description, mock, input, expected }) => {
        it(description, async () => {
            const req = mockRequest({ body: input });
            const res = mockResponse();

            if (mock && mock.save) {
                createCourse.mockResolvedValue(mock.save.result); 
            }

            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn().mockReturnThis();

            debug("Before function call");
            await addCourse(req, res);
            debug("After function call");

            expect(res.status).toHaveBeenCalledWith(expected.status);
            expect(res.json).toHaveBeenCalledWith(expected.response);
        });
    });
});
