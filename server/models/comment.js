const { DataTypes } = require('sequelize');
const db = require('../db');

const Comment = db.Sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jobid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Comment;