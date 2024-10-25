const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const modelSynchronization = require("./DBConfig/Synchronigation");
const validateController = require("./Controller/ValidateConroller");

const app = express();
const port = 5000;

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("hello world!");
});

/// Here Every one add their controller and ensure import/require top op the project
/// This is my Route/Controller
app.use("/api/batch-validate",validateController);

async function startServer() {
    await modelSynchronization();
    app.listen(port,() => {
        console.log(`Server is running ${port}`);
    });
}

startServer().then(r => console.log(r));