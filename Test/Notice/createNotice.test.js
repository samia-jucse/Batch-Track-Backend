const { createNotice } = require('../../View/NoticeView');
const NoticeModel = require("../../Model/NoticeModel");
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const debug = require('debug')('batchtrackbackend');
const fs = require('fs');
const path = require('path');

jest.mock("../../Model/NoticeModel");

describe("createNotice function", () => {
    let req, res;

    beforeAll(() => {
        console.error = jest.fn(); 
    });

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        jest.clearAllMocks();
    });

   
    const testCases = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'createTest.json'), 'utf-8'));

    testCases.forEach(({ testName, input, mockFindOne, mockCreate, expectedStatus, expectedResponse }) => {
        it(testName, async () => {
            req.body = input.body;

          
            if (mockFindOne === "Database error") {
                NoticeModel.findOne.mockRejectedValue(new Error("Database error"));
            } else {
                NoticeModel.findOne.mockResolvedValue(mockFindOne);
            }

            
            if (mockCreate) {
                NoticeModel.create.mockResolvedValue(mockCreate);
            } else {
                NoticeModel.create.mockResolvedValue(null); 
            }

            await createNotice(req, res);

            expect(NoticeModel.findOne).toHaveBeenCalledWith({ where: { title: req.body.title } });
            if (mockCreate) {
                expect(NoticeModel.create).toHaveBeenCalledWith(req.body);
            } else {
                expect(NoticeModel.create).not.toHaveBeenCalled();
            }

          
            expect(res.status).toHaveBeenCalledWith(expectedStatus);
            expect(res.json).toHaveBeenCalledWith(expectedResponse);
        });
    });
});