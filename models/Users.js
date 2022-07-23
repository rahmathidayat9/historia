const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role_id: {
        type: DataTypes.STRING,
    },
    }, {
    freezeTableName: true
});

module.exports = Users