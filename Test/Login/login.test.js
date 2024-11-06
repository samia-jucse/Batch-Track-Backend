const { loginTestCases } = require('./loginTestCases');
const { login } = require("../../View/LoginView");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const debug = require('debug')('batchtrackbackend');

jest.mock('../../Model/BatchModel', () => ({
    findOne: jest.fn(),
}));

const { findOne } = require('../../Model/BatchModel');

describe('login function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    debug("before run test cases")
    loginTestCases.forEach(({ description, mock, input, expected }) => {
        it(description, async () => {
            const req = mockRequest({ body: input });
            const res = mockResponse();

            if (mock && mock.findOne) {
                findOne.mockImplementation(() => {
                    if (mock.findOne.result === null) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(mock.findOne.result);
                });
            }
            debug("Before function call");
            await login(req, res);
            debug("After function call");

            expect(res.status).toHaveBeenCalledWith(expected.status);
        });
    });
});
