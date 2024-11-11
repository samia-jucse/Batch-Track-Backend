const { NoticeTestCases } = require('./NoticeTestCases');
const { sendNotice } = require("../../View/NoticeView");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const debug = require('debug')('departmentbackend');

jest.mock("../../Model/NoticeModel", () => ({
    create: jest.fn(),
}));

jest.mock('../../Model/UserModel', () => ({
    findOne: jest.fn(),
}));

const { create: createNotice } = require('../../Model/NoticeModel');
const { findOne: findUser } = require('../../Model/UserModel');

describe('sendNotice function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    NoticeTestCases.forEach(({ description, mock, input, expected }) => {
        it(description, async () => {
            const req = mockRequest({ body: input });
            const res = mockResponse();

            if (mock && mock.findUser) {
                findUser.mockImplementation(() => mock.findUser.result);
            }

            if (mock && mock.createNotice) {
                // Mock the implementation for createNotice to return or reject as per the test case
                if (mock.createNotice.result instanceof Error) {
                    createNotice.mockImplementation(() => Promise.reject(mock.createNotice.result));
                } else {
                    createNotice.mockImplementation(() => Promise.resolve(mock.createNotice.result));
                }
            }

            await sendNotice(req, res);
           // console.log(res.json.mock.calls);
            console.log('Actual response:', res.json.mock.calls);
            console.log("Expected response:", expected.response);

            expect(res.status).toHaveBeenCalledWith(expected.status);
            if (expected.response) {
                expect(res.json).toHaveBeenCalledWith(expected.response);
        
                
            }
        });
    });
});
