

const {DataTypes} = require('sequelize');
const sequelize = require('../DBConfig/Config'); // Adjust the path to your database configuration


const Notice = sequelize.define('Notice', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Title cannot be empty'
            }
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Content cannot be empty'
            }
        }
    },
    audienceType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['faculty', 'staff', 'students']], // Allowed values
                msg: 'Audience type must be faculty, staff, or students'
            }
        }
    },
    departmentId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Department ID cannot be empty'
            }
        }
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Created by field cannot be empty'
            }
        }
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'notices',
    timestamps: false // Disable automatic timestamps if you don’t need createdAt and updatedAt fields
});

module.exports = Notice;
