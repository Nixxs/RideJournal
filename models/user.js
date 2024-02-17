const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.Sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 120],
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }
);

module.exports = User;