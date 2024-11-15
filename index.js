const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const modelSynchronization = require("./DBConfig/Synchronigation");
const validateController = require("./Controller/ValidateConroller");

const userProfileController = require('./Controller/UserController');
const noticeController = require("./Controller/NoticeController");
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
// app.use("/api/update",updateProfileController);
app.use("/api/user",userProfileController);

app.use("/api/addNotice",noticeController);


async function startServer() {
    await modelSynchronization();
    app.listen(port,() => {
        console.log(`Server is running ${port}`);
    });
}

startServer().then(r => console.log(r));




