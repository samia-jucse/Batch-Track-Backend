const { getOneValidateBatch } = require('../../View/ValidateView');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const ValidateModel = require('../../Model/ValidateModel');
const debug = require('debug')('batchtrackbackend');

jest.mock('../../Model/ValidateModel');

describe('getOneValidateBatch function', () => {
    let req, res;

    beforeAll(() => {
        console.error = jest.fn();
    });

    beforeEach(() => {
        req = mockRequest();
        req.headers = {};
        res = mockResponse();
        jest.clearAllMocks();
    });

    it('should return validated data successfully', async () => {
        const mockValidatedData = {
            id: 1,
            registerEmail: 'user@example.com',
            registerCode: 'code1',
            loginCode: 'login1',
            registerStatus: true
        };

        req.headers['email'] = 'user@example.com';
        ValidateModel.findOne.mockResolvedValue(mockValidatedData);

        debug('Starting test for successful email retrieval');
        await getOneValidateBatch(req, res); // Call the function

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Validated email found",
            data: mockValidatedData,
        });
        debug('Test for successful email retrieval completed');
    });

    it('should return 400 if email header is missing', async () => {
        debug('Starting test for missing email header');
        await getOneValidateBatch(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Email header is required" });
        debug('Test for missing email header completed');
    });

    it('should return 404 if no validated batch found', async () => {
        req.headers['email'] = 'user@example.com';
        ValidateModel.findOne.mockResolvedValue(null);

        debug('Starting test for email not found');
        await getOneValidateBatch(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "No validated batch found for the provided email." }); // Check the error response
        debug('Test for email not found completed');
    });

    it('should handle errors gracefully', async () => {
        req.headers['email'] = 'user@example.com';
        const errorMessage = "Database error";
        ValidateModel.findOne.mockRejectedValue(new Error(errorMessage));

        debug('Starting test for error handling');
        await getOneValidateBatch(req, res);

        expect(console.error).toHaveBeenCalledWith(
            "Error retrieving validated batch for email:",
            req.headers['email'],
            "Error:",
            expect.any(Error)
        );

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong" });
        debug('Test for error handling completed');
    });

});
