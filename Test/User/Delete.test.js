const { deleteUser } = require('../../View/UserView'); // Adjust the import according to your file structure
const UserProfile = require('../../Model/UserProfile'); // Adjust this path as needed

jest.mock('../../Model/UserProfile'); // Mock the UserProfile model


describe("deleteUser", () => {
    it("should delete a user and return success message", async () => {
        // Mock the destroy method
        UserProfile.destroy.mockResolvedValue(1); // Simulate one user deleted

        const req = { params: { id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await deleteUser(req, res);

        expect(UserProfile.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully" });
    });

    it("should return 404 if user not found", async () => {
        UserProfile.destroy.mockResolvedValue(0); // Simulate no user deleted

        const req = { params: { id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle errors and return 500", async () => {
        UserProfile.destroy.mockRejectedValue(new Error("DB Error"));

        const req = { params: { id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
});