const { getAllNotices } = require('../../View/NoticeView');
const NoticeModel = require("../../Model/NoticeModel");
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const debug = require('debug')('batchtrackbackend');

jest.mock("../../Model/NoticeModel");

describe("getAllNotices function", () => {
    let req, res;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        jest.clearAllMocks();
    });

    it("should return a list of notices with a 200 status code", async () => {
        const notices = [
            { title: "Notice 1", description: "Description 1", author: "Author 1", createdAt: new Date() },
            { title: "Notice 2", description: "Description 2", author: "Author 2", createdAt: new Date() }
        ];

        NoticeModel.findAll.mockResolvedValue(notices);

        debug("Starting test for returning a list of notices");
        await getAllNotices(req, res);

        expect(NoticeModel.findAll).toHaveBeenCalledWith({ order: [['createdAt', 'DESC']] });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ data: notices });
        console.log("Expected Response Body:", { data: notices });
        debug("Test for returning a list of notices completed");
    });

    it("should return 404 if no notices are found", async () => {
        NoticeModel.findAll.mockResolvedValue([]);

        debug("Starting test for no notices found");
        await getAllNotices(req, res);

        expect(NoticeModel.findAll).toHaveBeenCalledWith({ order: [['createdAt', 'DESC']] });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "No notices found" });
        console.log("Expected Response Body:", { message: "No notices found" });
        debug("Test for no notices found completed");
    });

    it("should return 500 if an error occurs during fetching", async () => {
        NoticeModel.findAll.mockRejectedValue(new Error("Database error"));

        debug("Starting test for error handling during fetch");
        await getAllNotices(req, res);

        expect(NoticeModel.findAll).toHaveBeenCalledWith({ order: [['createdAt', 'DESC']] });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong" });
        console.log("Expected Response Body:", { message: "Something went wrong" });
        debug("Test for error handling during fetch completed");
    });
});
