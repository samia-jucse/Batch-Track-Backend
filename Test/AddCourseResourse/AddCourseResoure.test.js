
const { addResourse } = require("../../View/ResourseView");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const courseResourceTestCases = require("./AddCourseResourse")
const debug = require('debug')('batchtrackbackend');

jest.mock('../../Model/CourseResourseModel', () => ({
    create: jest.fn(),
}));

jest.mock('../../Model/BatchModel', () => ({
    findOne: jest.fn(),
}));

const { create: createResource } = require('../../Model/CourseResourseModel');
const { findOne: findTheValidCR } = require('../../Model/BatchModel');

describe('addCourseResource function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    debug("Before running test cases");
    courseResourceTestCases.forEach(({ description, mock, input, expected }) => {
        it(description, async () => {
            const req = mockRequest({ body: input });
            const res = mockResponse();

            if (mock && mock.mock) {
                createResource.mockResolvedValue(mock.mock.save.result); 
            }

    
            if (mock && mock.findOne) {
                findTheValidCR.mockResolvedValue(mock.findOne.result);
            }

            res.status = jest.fn().mockReturnThis(); 
            res.json = jest.fn().mockReturnThis(); 

            debug("Before function call");
            await addResourse(req, res); 
            debug("After function call");

            expect(res.status).toHaveBeenCalledWith(expected.status);
        });
    });
});
