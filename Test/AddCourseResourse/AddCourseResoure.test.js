
const { addResourse } = require("../../View/ResourseView");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const { courseResourceTestCases } = require("./addCourseResourseTestCases");
const debug = require('debug')('batchtrackbackend');

jest.mock('../../Model/CourseResourseModel', () => ({
    create: jest.fn(),
    findOne: jest.fn(), 
}));

jest.mock('../../Model/BatchModel', () => ({
    findOne: jest.fn(),
}));

const { create: createResource, findOne: findCourseResource } = require('../../Model/CourseResourseModel');
const { findOne: findBatch } = require('../../Model/BatchModel');

describe('addCourseResource function', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    debug("Before running test cases");
    courseResourceTestCases.forEach(({ description, mock, input, expected }) => {
        it(description, async () => {
            const req = mockRequest({ body: input });
            const res = mockResponse();

            if (mock.findOne) {
                findBatch.mockResolvedValue(mock.findOne.result); 
            }

            if (mock.existingResource) {
                findCourseResource.mockResolvedValue(mock.existingResource.result); 
            } else {
                findCourseResource.mockResolvedValue(null); 
            }

            if (mock.save) {
                createResource.mockResolvedValue(mock.save.result); 
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

