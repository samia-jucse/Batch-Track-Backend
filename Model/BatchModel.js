
const {DataTypes} = require("sequelize");
const sequelize = require('../DBConfig/Config');

const BatchModel = sequelize.define('BatchModel',{
    
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true },
    name:{type:DataTypes.STRING},
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    session: { type: DataTypes.STRING },
    profilePic: { type: DataTypes.STRING },
    coverPic: { type: DataTypes.STRING }
 },
    { timestamps: false });

    module.exports = BatchModel ;
    