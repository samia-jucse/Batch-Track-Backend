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
