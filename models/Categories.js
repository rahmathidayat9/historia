const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Categories = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
    },
    }, {
    freezeTableName: true
});

module.exports = Categories