"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Release = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
exports.Release = db_1.db.define('releases', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    image: {
        // type: DataTypes.STRING
        type: sequelize_1.DataTypes.TEXT
    },
    category: {
        type: sequelize_1.DataTypes.STRING
    },
    date: {
        type: sequelize_1.DataTypes.DATE
    },
});
