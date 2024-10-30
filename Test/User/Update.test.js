const { updateUser } = require('../../View/UserView'); // Adjust the import according to your file structure
const UserProfile = require('../../Model/UserProfile'); // Adjust this path as needed

jest.mock('../../Model/UserProfile'); // Mock the UserProfile model


describe("updateUser", () => {
    it("should update user info and return success message", async () => {
        // Mock the update method
        UserProfile.update.mockResolvedValue([1]); // Simulate successful update

        const req = {
            params: { id: 1 },
            body: { name: "Jane Doe", email: "jane@example.com" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await updateUser(req, res);

        expect(UserProfile.update).toHaveBeenCalledWith(req.body, { where: { id: 1 } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "User updated successfully" });
    });

    it("should return 404 if user not found", async () => {
        UserProfile.update.mockResolvedValue([0]); // Simulate no records updated

        const req = {
            params: { id: 1 },
            body: { name: "Jane Doe" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle errors and return 500", async () => {
        UserProfile.update.mockRejectedValue(new Error("DB Error"));

        const req = {
            params: { id: 1 },
            body: { name: "Jane Doe" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
});
