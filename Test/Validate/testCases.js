
const requestValidateCases = [
    {
        "description": "Successful validation creation",
        "request": {
            "headers": {
                "email": "test@example.com"
            }
        },
        "mock": {
            "findOne": null,
            "create": { "id": 1 },
            "update": [1]
        },
        "expected": {
            "status": 200,
            "response": {
                "message": "Validate successful."
            }
        }
    },
    {
        "description": "Email already exists",
        "request": {
            "headers": {
                "email": "existing@example.com"
            }
        },
        "mock": {
            "findOne": {}
        },
        "expected": {
            "status": 409,
            "response": {
                "message": "This email already exists"
            }
        }
    },
    {
        "description": "Missing email header",
        "request": {
            "headers": {}
        },
        "expected": {
            "status": 500,
            "response": {
                "message": "Something went wrong"
            }
        }
    },
    {
        "description": "Database error on create",
        "request": {
            "headers": {
                "email": "error@example.com"
            }
        },
        "mock": {
            "findOne": null,
            "create": { "id": null }
        },
        "expected": {
            "status": 500,
            "response": {
                "message": "Something went wrong"
            }
        }
    },
    {
        "description": "Database error on update",
        "request": {
            "headers": {
                "email": "updateError@example.com"
            }
        },
        "mock": {
            "findOne": null,
            "create": { "id": 1 },
            "update": null
        },
        "expected": {
            "status": 500,
            "response": {
                "message": "Something went wrong"
            }
        }
    }
];

const getAllValidBatchTestCases = [
    {
        "description": "Successful retrieval of all validate data",
        "mock": {
            "findAll": [
                { "id": 1, "registerEmail": "user1@example.com", "registerCode": "code1", "loginCode": "login1" },
                { "id": 2, "registerEmail": "user2@example.com", "registerCode": "code2", "loginCode": "login2" }
            ]
        },
        "expected": {
            "status": 200,
            "response": {
                "message": "All validate data",
                "data": [
                    { "id": 1, "registerEmail": "user1@example.com", "registerCode": "code1", "loginCode": "login1" },
                    { "id": 2, "registerEmail": "user2@example.com", "registerCode": "code2", "loginCode": "login2" }
                ]
            }
        }
    },
    {
        "description": "Database error while retrieving validate data",
        "mock": {
            "findAll": {
                "error": "Database error"
            }
        },
        "expected": {
            "status": 500,
            "response": {
                "message": "Something went wrong"
            }
        }
    }
];

const getOneValidBatchTestCases = [
    {
        "description": "Successful retrieval of a validated batch",
        "request": {
            "headers": {
                "email": "user@example.com"
            }
        },
        "mock": {
            "findOne": {
                "id": 1,
                "registerEmail": "user@example.com",
                "registerCode": "code1",
                "loginCode": "login1"
            }
        },
        "expected": {
            "status": 200,
            "response": {
                "message": "Validated email found",
                "data": {
                    "id": 1,
                    "registerEmail": "user@example.com",
                    "registerCode": "code1",
                    "loginCode": "login1"
                }
            }
        }
    },
    {
        "description": "No validated batch found for provided email",
        "request": {
            "headers": {
                "email": "nonexistent@example.com"
            }
        },
        "mock": {
            "findOne": null
        },
        "expected": {
            "status": 404,
            "response": {
                "message": "No validated batch found for the provided email."
            }
        }
    },
    {
        "description": "Missing email header",
        "request": {
            "headers": {}
        },
        "expected": {
            "status": 400,
            "response": {
                "message": "Email header is required"
            }
        }
    },
    {
        "description": "Database error while retrieving validated batch",
        "request": {
            "headers": {
                "email": "error@example.com"
            }
        },
        "mock": {
            "findOne": {
                "error": "Database error"
            }
        },
        "expected": {
            "status": 500,
            "response": {
                "message": "Something went wrong"
            }
        }
    }
]





module.exports =  {requestValidateCases,getAllValidBatchTestCases,getOneValidBatchTestCases};