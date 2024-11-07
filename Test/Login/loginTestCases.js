const loginTestCases = [
    {
        id: 1,
        description: "Valid login attempt",
        mock: {
            findOne: {
                result: { id: "user-id", email: "validuser@example.com", password: "ValidPassword123" }
            },
            validate: {
                result: { registerEmail: "validuser@example.com", loginCode: "ValidLoginCode" }
            }
        },
        input: { email: "validuser@example.com", password: "ValidPassword123", secret: "ValidLoginCode" },
        expected: {
            status: 200,
            response: {
                message: "Login success",
                data: { id: "user-id", email: "validuser@example.com" }
            }
        }
    },
    {
        id: 2,
        description: "Invalid password attempt",
        mock: {
            findOne: {
                result: { id: "user-id", email: "validuser@example.com", password: "hashedpassword" }
            },
            validate: {
                result: { registerEmail: "validuser@example.com", loginCode: "ValidLoginCode" }
            }
        },
        input: { email: "validuser@example.com", password: "WrongPassword", secret: "ValidLoginCode" },
        expected: {
            status: 401,
            response: {
                message: "Invalid password"
            }
        }
    },
    {
        id: 3,
        description: "User not found",
        mock: {
            findOne: {
                result: null
            }
        },
        input: { email: "invaliduser@example.com", password: "AnyPassword", secret: "ValidLoginCode" },
        expected: {
            status: 404,
            response: { message: "User not found" }
        }
    },
    {
        id: 4,
        description: "Internal server error",
        mock: {
            findOne: {
                result: Promise.reject(new Error("Database error"))
            }
        },
        input: { email: "user@example.com", password: "anypassword", secret: "ValidLoginCode" },
        expected: {
            status: 500,
            response: {
                message: "Internal server error"
            }
        },
    },
    {
        id: 5,
        description: "Bad request (Missing email, password, and secret)",
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
    },
    {
        id: 6,
        description: "Your email is not validated",
        mock: {
            findOne: {
                result: { id: "user-id", email: "validuser@example.com", password: "ValidPassword123" }
            },
            validate: {
                result: null
            }
        },
        input: { email: "validuser@example.com", password: "ValidPassword123", secret: "ValidLoginCode" },
        expected: {
            status: 405,
            response: {
                message: "Your email is not validated"
            }
        }
    },
    {
        id: 7,
        description: "Login secret is not valid",
        mock: {
            findOne: {
                result: { id: "user-id", email: "validuser@example.com", password: "ValidPassword123" }
            },
            validate: {
                result: { registerEmail: "validuser@example.com", loginCode: "WrongLoginCode" }
            }
        },
        input: { email: "validuser@example.com", password: "ValidPassword123", secret: "ValidLoginCode" },
        expected: {
            status: 406,
            response: {
                message: "Invalid login code"
            }
        }
    }
];

module.exports = { loginTestCases };
