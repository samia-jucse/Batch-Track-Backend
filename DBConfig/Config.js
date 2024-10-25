const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('batch_track', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;