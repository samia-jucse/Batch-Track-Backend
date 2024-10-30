const {DataTypes} = require('sequelize');
const sequelize = require('../DBConfig/Config');

const UserProfile = sequelize.define('UserProfile',{
    
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true },
    name:{type:DataTypes.STRING},
    email: { type: DataTypes.STRING },
    phone :{type:DataTypes.STRING},
    homeDistrict :{type:DataTypes.STRING},
    photo :{type:DataTypes.STRING},
 },
    { timestamps: false });


    module.exports = UserProfile;