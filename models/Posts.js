const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Posts = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
    },
    thumbnail: {
        type: DataTypes.STRING,
    },
    body: {
        type: DataTypes.TEXT,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    category_id: {
        type: DataTypes.INTEGER,
    },
    date_created: {
        type: DataTypes.STRING,
    },
    }, {
    freezeTableName: true
});

module.exports = Posts