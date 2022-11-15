import { DataTypes } from "sequelize";
import { db } from "../database/db";
import { User } from "./User";
import { Release } from "./Release";

export const Notifications = db.define('usernotifications', {
    type: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
});

User.hasMany(Notifications);
Notifications.hasOne(User);