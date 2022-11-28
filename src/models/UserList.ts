import { DataTypes } from "sequelize";
import { db } from "../database/db";
import { User } from "./User";
import { Release } from "./Release";

export const UserList = db.define('userlist', {
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.TEXT
    },
    date: {
        type: DataTypes.DATE
    },
});

User.hasMany(UserList);
UserList.hasMany(User);