const { getOneValidateBatch } = require('../../View/ValidateView');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const ValidateModel = require('../../Model/ValidateModel');
const {getOneValidBatchTestCases} = require("./testCases");
const debug = require('debug')('batchtrackbackend');

jest.mock('../../Model/ValidateModel');

describe('getOneValidateBatch function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    debug("Starting getOneValidateBatch function");
    getOneValidBatchTestCases.forEach(({ description, request, mock, expected }) => {
        it(description, async () => {
            const req = mockRequest(request);
            const res = mockResponse();

            if (mock) {
                ValidateModel.findOne.mockImplementation(() => {
                    if (mock.findOne === null) {
                        return Promise.resolve(null);
                    } else if (mock.findOne.error) {
                        return Promise.reject(new Error(mock.findOne.error));
                    }
                    return Promise.resolve(mock.findOne);
                });
            }
            debug("Before function call");
            await getOneValidateBatch(req, res);
            debug("After function call");

            expect(res.status).toHaveBeenCalledWith(expected.status);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expected.response));
        });
    });
});
