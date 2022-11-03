import { Sequelize } from "sequelize";

export const db = new Sequelize('quandolanca_database', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});