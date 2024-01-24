"use strict"
const User = require("./user");
const Car = require("./car");
const Job = require("./job");
const Comment = require("./comment");
const Image = require("./image");
const Like = require("./like");

async function init() {
    // create relationships between models
        User.hasMany(Car, {
            foreignKey: {
                name: "userid",
                allowNull: false,
            },
        });
        Car.belongsTo(User, {
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


        Car.hasMany(Job, {
            foreignKey: {
                name: "carid",
                allowNull: false,
            },
        });
        Job.belongsTo(Car, {
            foreignKey: {
                name: "carid",
                allowNull: false,
            },
        });

        Job.hasMany(Like, {
            foreignKey: {
                name: "jobid",
                allowNull: false,
            }
        });
        Like.belongsTo(Job, {
            foreignKey: {
                name: "jobid",
                allowNull: false,
            },
        });
        Job.hasMany(Comment, {
            foreignKey: {
                name: "jobid",
                allowNull: false,
            },
        });
        Comment.belongsTo(Job, {
            foreignKey: {
                name: "jobid",
                allowNull: false,
            },
        });
        Job.hasMany(Image, {
            foreignKey: {
                name: "jobid",
                allowNull: false,
            },
        });
        Image.belongsTo(Job, {
            foreignKey: {
                name: "jobid",
                allowNull: false,
            }
        });
      // sync all models with database
      await User.sync();
      await Car.sync();
      await Job.sync();
      await Comment.sync();
      await Image.sync();
      await Like.sync();
    }
    
    module.exports = {
      init,
    };