
const express = require('express');
const bodyParser = require('body-parser');
const {sendNotice} = require('../../View/AdminNotice'); // Import the function
const Notice = require('../../Model/AdminNotice'); // Mock the Notice model

const app = express();
app.use(bodyParser.json());
app.post('/notices', sendNotice);

// Mock authorization middleware
const mockAuthorizationMiddleware = (req, res, next) => {
    req.user = { role: 'DepartmentAdmin', userId: 'admin123' }; // Mocked authorized user
    next();
};
app.use(mockAuthorizationMiddleware);

// Mock the Notice model
jest.mock(require.resolve('../Model/Adminotice.js'));


describe("sendNotice", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a success message when notice is sent by authorized user with valid data', async () => {
        const noticeData = {
            title: 'Department Meeting',
            content: 'Meeting scheduled for Friday.',
            audienceType: 'faculty',
            departmentId: 'dept01'
        };

        // Mock Notice.create to resolve successfully
        Notice.create.mockResolvedValue({
            ...noticeData,
            createdBy: 'admin123',
            timestamp: expect.any(String)
        });

        const response = await request(app).post('/notices').send(noticeData);
        
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Department notice sent successfully');
        expect(Notice.create).toHaveBeenCalledWith(expect.objectContaining({
            ...noticeData,
            createdBy: 'admin123'
        }));
    });

    it('should return an error message if user is not authorized', async () => {
        app.use((req, res, next) => {
            req.user = { role: 'Student', userId: 'student123' }; // Mock unauthorized user
            next();
        });

        const response = await request(app).post('/notices').send({
            title: 'Unauthorized Notice',
            content: 'This should not be allowed',
            audienceType: 'faculty',
            departmentId: 'dept01'
        });

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('You are not authorised to send department notices');
    });

    it('should return a validation error message if required fields are missing', async () => {
        const response = await request(app).post('/notices').send({
            title: 'Missing Fields Notice'
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Notice title, content, audience type, and department identifier are required');
    });

    it('should return a failure message if the database operation fails', async () => {
        const noticeData = {
            title: 'Department Meeting',
            content: 'Meeting scheduled for Friday.',
            audienceType: 'faculty',
            departmentId: 'dept01'
        };

        Notice.create.mockRejectedValue(new Error('Database error'));

        const response = await request(app).post('/notices').send(noticeData);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Failed to send the department notice. Please try again later');
    });
});
