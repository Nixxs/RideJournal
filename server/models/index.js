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
            foreignKey: {
                name: "userid",
                allowNull: false,
            },
        });
        Vehicle.belongsTo(User, {
            foreignKey: {
                name: "userid",
                allowNull: false,
            }
        });
        User.hasMany(Comment, {
            foreignKey: {
                name: "userid",
                allowNull: false,
            },
        });
        Comment.belongsTo(User, {
            foreignKey: {
                name: "userid",
                allowNull: false,
            }
        });
        User.hasMany(Like, {
            foreignKey: {
                name: "userid",
                allowNull: false,
            },
        });
        Like.belongsTo(User, {
            foreignKey: {
                name: "userid",
                allowNull: false,
            }
        });


        Vehicle.hasMany(Event, {
            foreignKey: {
                name: "vehicleid",
                allowNull: false,
            },
        });
        Event.belongsTo(Vehicle, {
            foreignKey: {
                name: "vehicleid",
                allowNull: false,
            },
        });

        Event.hasMany(Like, {
            foreignKey: {
                name: "eventid",
                allowNull: false,
            }
        });
        Like.belongsTo(Event, {
            foreignKey: {
                name: "eventid",
                allowNull: false,
            },
        });
        Event.hasMany(Comment, {
            foreignKey: {
                name: "eventid",
                allowNull: false,
            },
        });
        Comment.belongsTo(Event, {
            foreignKey: {
                name: "eventid",
                allowNull: false,
            },
        });
        Event.hasMany(Image, {
            foreignKey: {
                name: "eventid",
                allowNull: false,
            },
        });
        Image.belongsTo(Event, {
            foreignKey: {
                name: "eventid",
                allowNull: false,
            }
        });
      // sync all models with database
      await User.sync();
      await Vehicle.sync();
      await Event.sync();
      await Comment.sync();
      await Image.sync();
      await Like.sync();
    }
    
    module.exports = {
      init,
    };