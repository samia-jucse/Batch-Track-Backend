
const { loginTestCases } = require('./loginTestCases');

// jest.mock('../../Model/BatchModel');

describe('login function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    loginTestCases.forEach(({ description, mock, input, expected }) => {
        it(description, async () => {
            const req = mockRequest({ body: input });
            const res = mockResponse();

            if (mock && mock.findOne) {
                BatchModel.findOne.mockImplementation(() => {
                    if (mock.findOne.result === null) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(mock.findOne.result);
                });
            }

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(expected.status);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expected.response));
        });
    });
});
