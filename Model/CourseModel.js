const { DataTypes } = require("sequelize");
const sequelize = require('../DBConfig/Config');

const CourseModel = sequelize.define('CourseModel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  courseCode: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseHours: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  courseCredit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  prerequisites: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  courseTeacher: {
    type: DataTypes.STRING,
    allowNull: true 
  }
}, {
  timestamps: false
});

module.exports = CourseModel;
