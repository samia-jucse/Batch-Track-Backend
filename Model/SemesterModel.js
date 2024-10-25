const sequelize = require("../DBConfig/Config");
const { DataTypes } = require("sequelize");

const SemesterModel = sequelize.define("SemesterModel", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    semesterName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    relatedCourses: {
        type: DataTypes.STRING, // or DataTypes.JSON if storing an array of course IDs
        allowNull: true // Adjust based on requirements
    }
}, {
    timestamps: true // This will automatically add `createdAt` and `updatedAt` fields
});

module.exports = SemesterModel;
