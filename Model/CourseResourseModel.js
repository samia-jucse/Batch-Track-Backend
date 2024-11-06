const {DataTypes} = require("sequelize");

const sequelize = require('../DBConfig/Config');

const CourseResourceModel = sequelize.define('CourseResourseModel',{

    id:{type:DataTypes.INTEGER,autoIncrement:true },
    courseCode: {type:DataTypes.STRING,primaryKey:true},
    resourseTitle :{type:DataTypes.STRING},
    resourseDescription:{type:DataTypes.STRING},
    resourseFile:{type:DataTypes.STRING}

},
{ timestamps: false } );

module.exports = CourseResourceModel ;