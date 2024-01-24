const { DataTypes } = require("sequelize");
const db = require("../db");

const Car = db.Sequelize.define("Car", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: {
    type: DataTypes.INTEGER,
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
});

module.exports = Car;
