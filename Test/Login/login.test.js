const { loginTestCases } = require('./loginTestCases');
const { login } = require("../../View/LoginView");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const debug = require('debug')('batchtrackbackend');

jest.mock('../../Model/BatchModel', () => ({
    findOne: jest.fn(),
}));

jest.mock('../../Model/ValidateModel', () => ({
    findOne: jest.fn(),
}));

const { findOne: findBatch } = require('../../Model/BatchModel');
const { findOne: findValidate } = require('../../Model/ValidateModel');

describe('login function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    debug("before run test cases");
    loginTestCases.forEach(({ description, mock, input, expected }) => {
        it(description, async () => {
            const req = mockRequest({ body: input });
            const res = mockResponse();

            if (mock && mock.findOne) {
                findBatch.mockImplementation(() => {
                    return mock.findOne.result;
                });
            }

            if (mock && mock.validate) {
                findValidate.mockImplementation(() => {
                    return mock.validate.result;
                });
            }

            debug("Before function call");
            await login(req, res);
            debug("After function call");

            expect(res.status).toHaveBeenCalledWith(expected.status);
        });
    });
});
