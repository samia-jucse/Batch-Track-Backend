const {DataTypes} = require("sequelize");

const sequelize = require('../DBConfig/Config');

const CourseResourceModel = sequelize.define('CourseResourseModel',{

    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey: true },
    courseCode: {type:DataTypes.STRING},
    resourseTitle :{type:DataTypes.STRING},
    resourseDescription:{type:DataTypes.STRING},
    resourseFile:{type:DataTypes.STRING}

},
{ timestamps: false } );

module.exports = CourseResourceModel ;