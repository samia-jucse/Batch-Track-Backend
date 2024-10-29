# Batch Track

## Project requirement

- One good idea like ([webstorm](https://www.jetbrains.com/webstorm/download/#section=windows),[vscode](https://code.visualstudio.com/download))
- Xampp for mysql database download from [here](https://www.apachefriends.org/)
- Postman for api testing download from [here](https://www.postman.com/downloads/) or use remotely from website

## To edit project (This is bottom to top approach).

### Model add

- Goto Model directory and create a .js file as a Model<br>

**Like**
```
const sequelize = require("../DBConfig/Config");
const {DataTypes} = require("sequelize");

const ValidateModel = sequelize.define("ValidateModel", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    registerCode: {type: DataTypes.STRING},
    loginCode: {type: DataTypes.STRING},
    registerEmail: {type: DataTypes.STRING},
    registerStatus: {type: DataTypes.BOOLEAN},
},{timestamps:true});

module.exports = ValidateModel;
```
- You have to export this to use from another directory
- Then This model directory import from ```Synchronization.js``` file

**Like**
```
const ValidateModel = require('../Model/ValidateModel');
```
- You just add the path nothing else.

## Data View

- To access Model data create a .js file to ```View``` directory.
- To manipulate Data create different function like - 
```
const ValidateModel = require("../Model/ValidateModel");
const crypto = require('crypto');

const requestValidateTest = async (req, res) => {
    const email = req.headers['email'];
    console.log(email);

    try {
        const validateBatch = await ValidateModel.findOne({ where: { registerEmail: email } });

        if (!validateBatch) {
            const newValidate = await ValidateModel.create({
                registerEmail: email,
                registerCode: crypto.randomBytes(4).toString('hex'),
                loginCode: crypto.randomBytes(4).toString('hex'),    
                registerStatus: false,
            });

            const id = newValidate.id;
            const regiHash = crypto.createHash("md5").update(id.toString()).digest("hex");
            const loginHash = crypto.createHash("md5").update(regiHash).digest("hex");

            await ValidateModel.update({
                registerCode: regiHash,
                loginCode: loginHash,
            }, {
                where: { id: id }
            });

            return res.status(200).json({ message: "Validate successful.", data: regiHash });
        } else {
            return res.status(409).json({ message: "This email already exists" });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


module.exports = {requestValidateTest};

```
**Note :** If you export like ```module.exports = {requestValidateTest};``` You have to import like ``` const {requestValidateTest} = require("../View/ValidateView");```
From Controller.

## Update Controller

- Controller just control your route and pass the routes to appropriate functions. Like-
```
const express = require('express');
const {requestValidateTest} = require("../View/ValidateView");
const validateController = express.Router();

validateController.post("/validate",requestValidateTest);

module.exports = validateController;
```

## Entry Point of The Project
- Entry point is ```index.js``` file.
- From here you create a root route and pass this your controller. Like-
```
app.use("/api/batch-validate",validateController);
```
**Note :** You just edit this Controller route and ensure the import statement top of the project. Like- <br>
```
const validateController = require("./Controller/ValidateConroller");
```
**Note :** When you run this project you ensure your ```apache and mysql``` is run from ```Xampp```. And one Database is exist this same name as ```batch_track```

### If any query please ask me , I am ready to explain more.
### Thanks For Reading.