const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Roles = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    }, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = Roles