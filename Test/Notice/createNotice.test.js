const { createNotice } = require('../../View/NoticeView');
const NoticeModel = require("../../Model/NoticeModel");
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const debug = require('debug')('batchtrackbackend');

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

    it("should create a new notice if it does not already exist", async () => {
        const newNotice = { description: "Test description", author: "author" };

        req.body = newNotice; 

        NoticeModel.findOne.mockResolvedValue(null); 
        NoticeModel.create.mockResolvedValue(newNotice); 

        debug('Starting test for creating a new notice');
        await createNotice(req, res); 

        const expectedResponse = {
            message: "Notice created successfully.",
            data: newNotice,
        };
        
        expect(NoticeModel.findOne).toHaveBeenCalledWith({ where: { title: newNotice.title } });
        expect(NoticeModel.create).toHaveBeenCalledWith(newNotice);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        console.log("Expected Response Body (new notice):", expectedResponse);
        debug('Test for creating a new notice completed');
    });

    it("should return 409 if the notice already exists", async () => {
        const existingNotice = { title: "Existing Notice", description: "Description", author: "Author" };
        req.body = existingNotice;

        NoticeModel.findOne.mockResolvedValue(existingNotice);

        debug('Starting test for notice already exists');
        await createNotice(req, res);

        const expectedResponse = { message: "This notice already exists" };
        
        expect(NoticeModel.findOne).toHaveBeenCalledWith({ where: { title: existingNotice.title } });
        expect(NoticeModel.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        console.log("Expected Response Body (notice exists):", expectedResponse);
        debug('Test for notice already exists completed');
    });

    it("should return 500 if an error occurs", async () => {
        const newNotice = { title: "New Notice", description: "Description", author: "Author" };
        req.body = newNotice;

        NoticeModel.findOne.mockRejectedValue(new Error("Database error"));
        debug('Starting test for error handling');
        await createNotice(req, res);

        const expectedResponse = { message: "Something went wrong" };

        expect(NoticeModel.findOne).toHaveBeenCalledWith({ where: { title: newNotice.title } });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        console.log("Expected Response Body (error case):", expectedResponse);
        debug('Test for error handling completed');
    });

    // it("should fail to create a new notice with incorrect expectations", async () => {
    //     const newNotice = { title: "Incorrect Notice", description: "This test is meant to fail", author: "author" };
    
    //     req.body = newNotice;
    
    //     NoticeModel.findOne.mockResolvedValue(null); 
    //     NoticeModel.create.mockResolvedValue(newNotice);
    
    //     debug('Starting test for incorrect expectations');
    //     await createNotice(req, res);
    
    //     const incorrectExpectedResponse = {
    //         message: "Notice was not created successfully.",
    //         data: null,
    //     };
    
    //     expect(NoticeModel.findOne).toHaveBeenCalledWith({ where: { title: newNotice.title } });
    //     expect(NoticeModel.create).toHaveBeenCalledWith(newNotice);
    
    //     // Incorrect expectations for testing purposes
    //     expect(res.status).toHaveBeenCalledWith(201); // Expecting a 400 instead of 201
    //     expect(res.json).toHaveBeenCalledWith(incorrectExpectedResponse); // Expecting an incorrect response message
    //     console.log("Expected (incorrect) Response Body:", incorrectExpectedResponse);
    //     debug('Test for incorrect expectations completed');
    // });
    
});
