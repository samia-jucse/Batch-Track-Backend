const loginTestCases = [
    {
        description: "Valid login attempt",
        mock: {
            findOne: {
                result: { id: "user-id", email: "validuser@example.com", password: "ValidPassword123" }
            }
        },
        input: { email: "validuser@example.com", password: "ValidPassword123" },
        expected: {
            status: 200,
            response: {
                message: "Login success",
                data: { id: "user-id", email: "validuser@example.com" }
            }
        }
    },
    {
        description: "Invalid password attempt",
        mock: {
            findOne: {
                result: { id: "user-id", email: "validuser@example.com", password: "hashedpassword" }
            }
        },
        input: { email: "validuser@example.com", password: "WrongPassword" },
        expected: {
            status: 401,
            response: {
                message: "Invalid password"
            }
        }
    },
    {
        description: "User not found",
        mock: {
            findOne: {
                result: null
            }
        },
        input: { email: "invaliduser@example.com", password: "AnyPassword" },
        expected: {
            status: 404,
            response: { message: "User not found" }
        }
    },
    {
        description: "Internal server error",
        mock: {
            findOne: {
                result: Promise.reject(new Error("Database error"))
            }
        },
        input: { email: "user@example.com", password: "anypassword" },
        expected: {
            status: 500,
            response: {
                message: "Internal server error"
            }
        },
    },
    {
        description: "Bad request (Missing both email and password)",
        mock: {
            findOne: {
                result: null
            }
        },
        input: {},
        expected: {
            status: 400,
            response: {
                message: "Bad Request: Missing email or password"
            }
        }
    }
];

module.exports = { loginTestCases };
