const { getAllValidateBatch } = require('../../View/ValidateView');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const ValidateModel = require('../../Model/ValidateModel');
const debug = require('debug')('batchtrackbackend');

jest.mock('../../Model/ValidateModel');

describe('getAllValidateBatch function', () => {
    let req, res;

    beforeAll(() => {
        console.error = jest.fn();
    });

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        jest.clearAllMocks();
    });

    it('should return all validated data successfully', async () => {
        const mockValidatedData = [
            { id: 1, registerEmail: 'user1@example.com', registerCode: 'code1', loginCode: 'login1', registerStatus: true },
            { id: 2, registerEmail: 'user2@example.com', registerCode: 'code2', loginCode: 'login2', registerStatus: false }
        ];

        ValidateModel.findAll.mockResolvedValue(mockValidatedData);

        debug('Starting test for successful data retrieval');
        await getAllValidateBatch(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "All validate data",
            data: mockValidatedData,
        });
        debug('Test for successful data retrieval completed');
    });

    it('should handle errors gracefully', async () => {
        const errorMessage = "Database error";
        ValidateModel.findAll.mockRejectedValue(new Error(errorMessage));

        debug('Starting test for error handling');
        await getAllValidateBatch(req, res); // Call the function

        expect(console.error).toHaveBeenCalledWith("Error:", expect.any(Error));
        expect(res.status).toHaveBeenCalledWith(500); // Check the status code
        expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong" });
        debug('Test for error handling completed');
    });
});
