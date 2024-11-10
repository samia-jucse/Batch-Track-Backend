const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const modelSynchronization = require("./DBConfig/Synchronigation");
const validateController = require("./Controller/ValidateConroller");
const batchController = require('./Controller/BatchController');
const courseController = require('./Controller/CourseController');

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

app.use("/api/batch-validate",validateController);
app.use("/api/batch",batchController);
app.use("/api/course",courseController);



async function startServer() {
    await modelSynchronization();
    app.listen(port,() => {
        console.log(`Server is running ${port}`);
    });
}

startServer().then(r => console.log(r));