import { DataTypes } from "sequelize";
import { db } from "../database/db";

export const Release = db.define('releases', {
    name: {
        type: DataTypes.STRING
    },
    image: {
        // type: DataTypes.STRING
        type: DataTypes.TEXT
    },
    category: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
});