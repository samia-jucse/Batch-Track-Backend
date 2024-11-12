const { getAllNotices } = require('../../View/NoticeView');
const NoticeModel = require('../../Model/NoticeModel');
const httpMocks = require('node-mocks-http');
const getAllNoticesTestCases = require('./GetAllNoticesTestCases');

jest.mock('../../Model/NoticeModel');

describe('getAllNotices Function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    getAllNoticesTestCases.forEach((testCase) => {
        it(testCase.description, async () => {
            if (testCase.mockData !== null) {
                NoticeModel.findAll.mockResolvedValue(testCase.mockData);
            } else {
                NoticeModel.findAll.mockRejectedValue(new Error('Database error'));
            }

            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            await getAllNotices(req, res);

            expect(res.statusCode).toBe(testCase.expectedOutput.status);
            expect(res._getJSONData()).toEqual(testCase.expectedOutput.response);
        });
    });
});
