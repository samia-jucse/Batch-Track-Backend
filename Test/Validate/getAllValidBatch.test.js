const { getAllValidateBatch } = require('../../View/ValidateView');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const ValidateModel = require('../../Model/ValidateModel');
const {getAllValidBatchTestCases} = require("./testCases");
const debug = require('debug')('batchtrackbackend');

jest.mock('../../Model/ValidateModel');

describe('getAllValidateBatch function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    getAllValidBatchTestCases.forEach(({ description, mock, expected }) => {
        it(description, async () => {
            const req = mockRequest();
            const res = mockResponse();

            // Mock the behavior based on the current test case
            if (mock) {
                ValidateModel.findAll.mockImplementation(() => {
                    if (mock.findAll.error) {
                        return Promise.reject(new Error(mock.findAll.error));
                    }
                    return Promise.resolve(mock.findAll);
                });
            }

            await getAllValidateBatch(req, res);

            expect(res.status).toHaveBeenCalledWith(expected.status);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expected.response));
        });
    });
});
