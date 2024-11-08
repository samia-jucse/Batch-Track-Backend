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
    allowNull: false, // Optional: Ensure the course code is not null
    unique: true // Optional: Ensure the course code is unique
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
    allowNull: true // Optional: Can be null if no prerequisites
  },
  courseTeacher: {
    type: DataTypes.STRING,
    allowNull: true // Optional: Can be null if no teacher is assigned
  }
}, {
  timestamps: false
});

module.exports = CourseModel;
