const { DataTypes } = require('sequelize');

const sequelize = require('../DBConfig/Config');


const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        
    },
    email: {
        type: DataTypes.STRING,
        
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING
       
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Faculty', 'Student'),  // Modify roles as needed
        allowNull: false,
    },
    departmentId: {
        type: DataTypes.STRING
        
    }
}, {
    tableName: 'Users',
    timestamps: false,
});

module.exports = UserModel;
