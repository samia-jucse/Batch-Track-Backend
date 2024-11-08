const { getBatchByName } = require('../../View/BatchView');
const BatchModel = require("../../Model/BatchModel");
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const fs = require('fs');
const path = require('path');
jest.mock("../../Model/BatchModel");
describe("getBatchByName function", () => {
    let req, res;
    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        jest.clearAllMocks();
    });

    const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'searchTest.json'), 'utf-8'));
    testCases.validSearches.forEach(({ description, input, expected }) => {
        it(description, async () => {
            req.query = { name: input };

            BatchModel.findAll.mockResolvedValue([{ name: input }]);

            await getBatchByName(req, res);
            expect(BatchModel.findAll).toHaveBeenCalledWith({ where: { name: req.query.name }, attributes: { exclude: ['password','id','email'] } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ name: input }]);
        });
    });

    testCases.invalidSearches.forEach(({ description, input, expected }) => {
        it(description, async () => {
            req.query = { name: input };

            BatchModel.findAll.mockResolvedValue([]);

            await getBatchByName(req, res);

            expect(BatchModel.findAll).toHaveBeenCalledWith({ where: { name: req.query.name }, attributes: { exclude: ['password','id','email'] } });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "No batches found with the specified name." });
        });
    });
});
