"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserList = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const User_1 = require("./User");
exports.UserList = db_1.db.define('userlist', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    image: {
        type: sequelize_1.DataTypes.TEXT
    },
    date: {
        type: sequelize_1.DataTypes.DATE
    },
});
User_1.User.hasMany(exports.UserList);
exports.UserList.hasMany(User_1.User);
