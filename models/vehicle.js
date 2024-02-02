const { DataTypes } = require("sequelize");
const db = require("../db");

const Vehicle = db.Sequelize.define("Vehicle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM,
    values: ['car', 'motorcyle', 'boat', 'bicycle'],
    allowNull: false,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      isInRange(value) {
        const currentYear = new Date().getFullYear();
        if (value < 1900 || value > currentYear) {
          throw new Error("Year must be between 1900 and the current year");
        }
      },
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Vehicle;
