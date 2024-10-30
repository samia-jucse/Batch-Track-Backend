const { createSemester } = require("../View/SemesterView");
const SemesterModel = require("../Model/SemesterModel");

// Mocking the SemesterModel for isolated unit testing
jest.mock("../Model/SemesterModel");

describe("createSemester", () => {
    let req, res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("should return 201 if the semester is created successfully", async () => {
        req.body = {
            semesterName: "Fall 2024",
            startDate: "2024-09-01",
            endDate: "2024-12-15",
            relatedCourses: ["Math101", "CS202"]
        };

        SemesterModel.findOne.mockResolvedValue(null);
        SemesterModel.create.mockResolvedValue({ id: 1, ...req.body });

        await createSemester(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Semester added successfully.",
            data: { id: 1, ...req.body }
        });
    });

    it("should return 409 if a semester with similar details already exists", async () => {
        req.body = {
            semesterName: "Fall 2024",
            startDate: "2024-09-01",
            endDate: "2024-12-15"
        };

        SemesterModel.findOne.mockResolvedValue({ id: 1, ...req.body });

        await createSemester(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: "Semester with this name already exists."
        });
    });

    it("should return 400 if startDate or endDate is invalid", async () => {
        req.body = {
            semesterName: "Fall 2024",
            startDate: "invalid-date",
            endDate: "2024-12-15"
        };

        await createSemester(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Invalid date format for startDate or endDate."
        });
    });

    it("should return 400 if required fields are missing", async () => {
        req.body = {
            startDate: "2024-09-01",
            endDate: "2024-12-15"
        };

        await createSemester(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Missing required fields: semesterName, startDate, or endDate."
        });
    });

    it("should return 500 if there is a server error", async () => {
        req.body = {
            semesterName: "Spring 2025",
            startDate: "2025-01-10",
            endDate: "2025-04-20"
        };

        SemesterModel.findOne.mockRejectedValue(new Error("Database error"));

        await createSemester(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Failed to add semester due to a server error."
        });
    });
});
