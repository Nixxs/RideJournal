"use strict"
const User = require("./user");
const Vehicle = require("./vehicle");
const Event = require("./event");
const Comment = require("./comment");
const Image = require("./image");
const Like = require("./like");

async function init() {
    // create relationships between models
        User.hasMany(Vehicle, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
        });
        Vehicle.belongsTo(User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            }
        });
        User.hasMany(Comment, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
        });
        Comment.belongsTo(User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            }
        });
        User.hasMany(Like, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
        });
        Like.belongsTo(User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            }
        });
        User.hasMany(Event, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
        });
        Event.belongsTo(User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
        });


        Vehicle.hasMany(Event, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: "vehicleId",
                allowNull: false,
            },
        });
        Event.belongsTo(Vehicle, {
            foreignKey: {
                name: "vehicleId",
                allowNull: false,
            },
        });

        Event.hasMany(Like, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: "eventId",
                allowNull: false,
            }
        });
        Like.belongsTo(Event, {
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
        });
        Event.hasMany(Comment, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
        });
        Comment.belongsTo(Event, {
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
        });
        Event.hasMany(Image, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: "eventId",
                allowNull: false,
            },
        });
        Image.belongsTo(Event, {
            foreignKey: {
                name: "eventId",
                allowNull: false,
            }
        });
      // sync all models with database
      await User.sync({ force: true });
      await Vehicle.sync({ force: true });
      await Event.sync({ force: true });
      await Comment.sync({ force: true });
      await Image.sync({ force: true });
      await Like.sync({ force: true });
    }

    module.exports = {
      init,
    };