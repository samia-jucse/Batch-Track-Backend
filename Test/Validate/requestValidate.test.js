const { requestValidate } = require('../../View/ValidateView');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const ValidateModel = require('../../Model/ValidateModel');
const {requestValidateCases} = require("./testCases");
const debug = require('debug')('batchtrackbackend');


jest.mock('../../Model/ValidateModel'); // Mock the model

ValidateModel.findOne = jest.fn();
ValidateModel.create = jest.fn();

describe('requestValidateTest function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    requestValidateCases.forEach(({ description, request, mock, expected }) => {
        it(description, async () => {
            const req = mockRequest(request);
            const res = mockResponse();

            // Mock the behavior based on the current test case
            if (mock) {
                ValidateModel.findOne.mockResolvedValue(mock.findOne);
                if (mock.create) {
                    ValidateModel.create.mockResolvedValue(mock.create);
                }
                if (mock.update) {
                    ValidateModel.update.mockResolvedValue(mock.update);
                }
            }

            await requestValidate(req, res);

            expect(res.status).toHaveBeenCalledWith(expected.status);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expected.response));
        });
    });
});