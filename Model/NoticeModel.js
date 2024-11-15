const { DataTypes } = require('sequelize');
const sequelize = require('../DBConfig/Config');
//const sequelize = require('../config/database');  // Assuming you have a database configuration file

const NoticeModel = sequelize.define('Notice', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    audienceType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departmentId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Notices',
    timestamps: false,  // Disable Sequelize auto-timestamps if not needed
});

module.exports = NoticeModel;
