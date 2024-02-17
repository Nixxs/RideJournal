const { DataTypes } = require('sequelize');
const db = require('../db');

const Event = db.Sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehicleId : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM,
        values: ['repair', 'modification', 'story', 'maintenance'],
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    odometer: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Event;