const { getAllBatch } = require('../../View/BatchView'); // Adjust the import according to your file structure
const BatchModel = require('../../Model/BatchModel'); // Adjust this path as needed

jest.mock('../../Model/BatchModel'); // Mock the BatchModel

describe('getAllBatch', () => {
    let req, res;

    beforeEach(() => {
        req = {}; // req can be empty for this test
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('should return 200 and batches when successfully retrieved', async () => {
        const mockBatches = [
            { id: 1, name: 'Batch 1' },
            { id: 2, name: 'Batch 2' },
        ];

        BatchModel.findAll.mockResolvedValueOnce(mockBatches); // Mocking the findAll method

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
