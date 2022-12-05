"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifications = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const User_1 = require("./User");
exports.Notifications = db_1.db.define('usernotifications', {
    type: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    stage: {
        type: sequelize_1.DataTypes.INTEGER
    },
    releaseName: {
        type: sequelize_1.DataTypes.STRING
    },
    notificaionReadStatus: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
User_1.User.hasMany(exports.Notifications);
exports.Notifications.hasOne(User_1.User);
