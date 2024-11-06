



const loginTestCases = [
    {
        description: "Valid login attempt",
        mock: {
            findOne: {
                result: { id: "user-id", email: "validuser@example.com" }
            }
        },
        input: { email: "validuser@example.com", password: "ValidPassword123" },
        expected: {
            status: 200,
            response: {
                message: "Login successful",
                user: { id: "user-id", email: "validuser@example.com" }
            }
        }
    },

    // {
    //     description: "Invalid password attempt",
    //     mock: {
    //         findOne: {
    //             result: { id: "user-id", email: "validuser@example.com" } // Mocked user with wrong password
    //         }
    //     },
    //     input: { email: "validuser@example.com", password: "WrongPassword" },
    //     expected: {
    //         status: 401,
    //         response: { message: "Invalid password" }
    //     }
    // },
    //
    // {
    //     description: "User not found",
    //     mock: {
    //         findOne: {
    //             result: null // No user found
    //         }
    //     },
    //     input: { email: "invaliduser@example.com", password: "AnyPassword" },
    //     expected: {
    //         status: 404,
    //         response: { message: "User not found" }
    //     }
    // }
];

module.exports = { loginTestCases };
