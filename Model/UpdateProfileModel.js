const {DataTypes} = require('sequelize');
const sequelize = require('../DBConfig/Config');

const UpdateProfileModel = sequelize.define('UpdateProfileModel',{
    
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true },
    name:{type:DataTypes.STRING},
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    details :{type:DataTypes.STRING}
 },
    { timestamps: false });


    module.exports = UpdateProfileModel;