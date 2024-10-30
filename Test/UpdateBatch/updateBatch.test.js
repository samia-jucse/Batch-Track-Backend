const { updateBatch } = require('../../View/BatchView');
const BatchModel = require('../../Model/BatchModel');

jest.mock('../../Model/BatchModel.js');

describe('updateBatch', () => {
    let req, res;

    beforeEach(() => {
        req = {
            headers: { id: '1' },
            body: { name: 'New Name', email: 'newemail@example.com', password: 'newpassword' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should update batch and return success message', async () => {
        const batch = { id: '1', name: 'Old Name', email: 'oldemail@example.com', password: 'oldpassword' };
        
        BatchModel.findByPk.mockResolvedValue(batch);
        BatchModel.update.mockResolvedValue([1]); // returns 1 to indicate one record was updated

        await updateBatch(req, res);

        expect(BatchModel.findByPk).toHaveBeenCalledWith('1');
        expect(BatchModel.update).toHaveBeenCalledWith({
            name: 'New Name',
            email: 'newemail@example.com',
            password: 'newpassword'
        }, { where: { id: '1' } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Update successful.', data: [1] });
    });

    it('should return 404 if batch not found', async () => {
        BatchModel.findByPk.mockResolvedValue(null);

        await updateBatch(req, res);

        expect(BatchModel.findByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Batch not found.' });
    });

    it('should return 500 if an error occurs', async () => {
        const errorMessage = 'Something went wrong';
        BatchModel.findByPk.mockRejectedValue(new Error(errorMessage));

        await updateBatch(req, res);

        expect(BatchModel.findByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});
