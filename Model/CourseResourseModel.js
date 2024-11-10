const {DataTypes} = require("sequelize");

const sequelize = require('../DBConfig/Config');

const CourseResourceModel = sequelize.define('CourseResourseModel',{

    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey: true },
    courseCode: {type:DataTypes.STRING},
    resourceTitle :{type:DataTypes.STRING},
    resourceDescription:{type:DataTypes.STRING},
    resourceFile:{type:DataTypes.STRING}

},
{ timestamps: false } );

module.exports = CourseResourceModel ;

