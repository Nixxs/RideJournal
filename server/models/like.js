const { DataTypes } = require('sequelize');
const db = require('../db');

const Like = db.Sequelize.define('Like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jobid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Like;