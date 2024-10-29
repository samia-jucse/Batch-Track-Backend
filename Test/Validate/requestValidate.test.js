const { requestValidate } = require('../../View/ValidateView');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const ValidateModel = require('../../Model/ValidateModel');
const debug = require('debug')('batchtrackbackend');


jest.mock('../../Model/ValidateModel'); // Mock the model

ValidateModel.findOne = jest.fn();
ValidateModel.create = jest.fn();

describe('requestValidateTest function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new validation if email does not exist', async () => {
        debug('Running test for existing email validation');

        ValidateModel.findOne.mockResolvedValue(null);

        const mockValidateModel = {
            id: 1,
            registerEmail: 'newuser@example.com',
            registerCode: 'mockRegisterCode',
            loginCode: 'mockLoginCode',
            registerStatus: false,
        };


        ValidateModel.create.mockResolvedValue(mockValidateModel);

        const req = mockRequest({ headers: { email: 'newuser@example.com' } });
        const res = mockResponse();

        debug('Start the validation if email does not exist');
        await requestValidate(req, res);

        expect(ValidateModel.create).toHaveBeenCalledWith(
            expect.objectContaining({ registerEmail: 'newuser@example.com' })
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Validate successful.",
        }));

        debug('Validation created successfully for email:', req.headers.email);
    });

    it('should return 409 if email already exists', async () => {
        debug('Running test if email already exists');

        ValidateModel.findOne.mockResolvedValue({ registerEmail: 'test@example.com' });

        const req = mockRequest({ headers: { email: 'test@example.com' } });
        const res = mockResponse();

        debug('Checking for existing email:', req.headers.email);
        await requestValidate(req, res);

        expect(ValidateModel.findOne).toHaveBeenCalledWith({
            where: { registerEmail: 'test@example.com' }
        });
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: "This email already exists"
        });

        debug('Email already exists:', req.headers.email);
    });

    it('should return 500 if there is an error', async () => {
        debug('Running test not connecting database');

        ValidateModel.findOne.mockRejectedValue(new Error("Database error"));

        const req = mockRequest({ headers: { email: 'error@example.com' } });
        const res = mockResponse();

        debug('Simulating database error for email:', req.headers.email);
        await requestValidate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong" });

        debug('Handled database error for email:', req.headers.email);
    });
});
