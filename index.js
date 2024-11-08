const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const modelSynchronization = require("./DBConfig/Synchronigation");
const validateController = require("./Controller/ValidateConroller");
const noticeController = require("./Controller/NoticeController");
const batchController = require("./Controller/BatchController");

const app = express();
const port = 5000;

app.use(cors({ origin: '*', credentials: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("hello world!");
});


app.use("/api/batch-validate", validateController);
app.use("/api/notice",noticeController);
app.get('/api/notice',noticeController);
app.use("/api/batch",batchController);

async function startServer() {
    await modelSynchronization();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer().then(() => console.log("Server started successfully."));
