const { getAllBatch, createBatch } = require('../../View/BatchView'); // Adjust the path as necessary
const BatchModel = require('../../Model/BatchModel'); // Adjust this path as needed

jest.mock('../../Model/BatchModel');

describe('Batch Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: 'Batch Name',
                email: 'batch@example.com',
                password: 'password123',
                session: '2023-2024',
                profilePic: 'profile.jpg',
                coverPic: 'cover.jpg',
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('getAllBatch', () => {
        test('should return 200 and a list of batches', async () => {
            const mockBatches = [{ id: 1, name: 'Batch 1' }, { id: 2, name: 'Batch 2' }];
            BatchModel.findAll.mockResolvedValueOnce(mockBatches); // Mocking findAll

            await getAllBatch(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockBatches);
        });

        test('should return 500 if an error occurs', async () => {
            BatchModel.findAll.mockRejectedValueOnce(new Error('Database error')); // Simulate an error

            await getAllBatch(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
        });
    });

    describe('createBatch', () => {
        test('should return 201 and create a new batch when valid data is provided', async () => {
            BatchModel.findOne.mockResolvedValueOnce(null); // No existing batch
            BatchModel.create.mockResolvedValueOnce(req.body); // Mocking create

            await createBatch(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                data: req.body, // Adjust this to match the response structure
                message: "Batch Create Sucesfully"
            });
        });

        test('should return 400 if required fields are missing', async () => {
            req.body = { email: 'batch@example.com' }; // Missing required fields

            await createBatch(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid data provided' });
        });

        test('should return 409 if a batch already exists with the provided email', async () => {
            BatchModel.findOne.mockResolvedValueOnce({ id: 1, email: 'batch@example.com' }); // Existing batch

            await createBatch(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ message: "Batch already exists with this email." });
        });

        test('should return 500 if an error occurs during batch creation', async () => {
            BatchModel.findOne.mockResolvedValueOnce(null); // No existing batch
            BatchModel.create.mockRejectedValueOnce(new Error('Database error')); // Simulate an error

            await createBatch(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });
    });
});
