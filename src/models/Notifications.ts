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
    },
    stage: {
        type: DataTypes.INTEGER
    },
    releaseName: {
        type: DataTypes.STRING
    },
    notificaionReadStatus: {
        type: DataTypes.BOOLEAN
    }
});

User.hasMany(Notifications);
Notifications.hasOne(User);