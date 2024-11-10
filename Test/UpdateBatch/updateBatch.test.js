const { updateBatch } = require('../../View/BatchView');
const BatchModel = require('../../Model/BatchModel');
const testCases = require('./updateTest.json'); // Load the JSON file

jest.mock('../../Model/BatchModel.js');

describe('updateBatch', () => {
    let req, res;

    beforeEach(() => {
        req = {
            headers: {},
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    testCases.forEach(({ description, mock, input, expected }) => {
        it(description, async () => {
            req.headers = input.headers;
            req.body = input.body;
            if (mock.findByPk) {
                if (mock.findByPk.error) {
                    BatchModel.findByPk.mockRejectedValue(new Error(mock.findByPk.error.message));
                } else {
                    BatchModel.findByPk.mockResolvedValue(mock.findByPk.result);
                }
            }

            if (mock.update) {
                BatchModel.update.mockResolvedValue(mock.update.result);
            }

            await updateBatch(req, res);
            expect(BatchModel.findByPk).toHaveBeenCalledWith(input.headers.id);
            if (mock.update) {
                expect(BatchModel.update).toHaveBeenCalledWith(
                    req.body,
                    { where: { id: input.headers.id } }
                );
            }
            expect(res.status).toHaveBeenCalledWith(expected.status);
            if (expected.json) {
                expect(res.json).toHaveBeenCalledWith(expected.json);
            }
        });
    });
});
