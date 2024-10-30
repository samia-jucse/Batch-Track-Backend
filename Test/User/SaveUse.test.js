const { saveUser } = require('../../View/UserView'); // Adjust the import according to your file structure
const UserProfile = require('../../Model/UserProfile'); // Adjust this path as needed

jest.mock('../../Model/UserProfile'); // Mock the UserProfile model

describe('saveUser', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: 'niaz',
                email: 'niaz@example.com',
                phone: '1234567890',
                homeDistrict: 'Bhola',
                photo: 'photo.jpg'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('should return 201 and success message when user is added successfully', async () => {
        const mockUserProfile = {
            id: 1,
            name: 'niaz',
            email: 'niaz@example.com',
            phone: '1234567890',
            homeDistrict: 'Bhola',
            photo: 'photo.jpg'
        };

        UserProfile.create.mockResolvedValueOnce(mockUserProfile); // Mocking the create method

        await saveUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "User is added successfully",
            data: mockUserProfile
        });
    });

    test('should return 500 if an error occurs', async () => {
        UserProfile.create.mockRejectedValueOnce(new Error('Database error')); // Simulate an error

        await saveUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
});