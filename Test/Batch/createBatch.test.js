const { createBatch } = require('../../View/BatchView'); // Adjust the import according to your file structure
const BatchModel = require('../../Model/BatchModel'); // Adjust this path as needed

jest.mock('../../Model/BatchModel'); // Mock the BatchModel

describe('Create batch testing', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('should return 400 if no data provided', async () => {
        await createBatch(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'No data provided' });
    });

    test('should return 400 if missing required fields', async () => {
        req.body = { name: 'John' }; // Missing other fields
        await createBatch(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid data provided' });
    });

    test('should return 409 if batch already exists', async () => {
        req.body = {
            name: 'John',
            email: 'john@example.com',
            password: 'password123',
            session: '2024',
            profileimage: 'profile.jpg',
            coverimage: 'cover.jpg'
        };

        BatchModel.findOne.mockResolvedValueOnce(true); // Simulate existing batch

        await createBatch(req, res);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ message: "Batch already exists with this email." });
    });

    test('should create a new batch and return 201', async () => {
        req.body = {
            name: 'John',
            email: 'john@example.com',
            password: 'password123',
            session: '2024',
            profileimage: 'profile.jpg',
            coverimage: 'cover.jpg'
        };

        BatchModel.findOne.mockResolvedValueOnce(null); // Simulate no existing batch
        BatchModel.create.mockResolvedValueOnce(req.body); // Simulate created batch

        await createBatch(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    test('should handle internal server errors', async () => {
        req.body = {
            name: 'John',
            email: 'john@example.com',
            password: 'password123',
            session: '2024',
            profileimage: 'profile.jpg',
            coverimage: 'cover.jpg'
        };

        BatchModel.findOne.mockResolvedValueOnce(null);
        BatchModel.create.mockRejectedValueOnce(new Error('Database error')); // Simulate an error

        await createBatch(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
});
