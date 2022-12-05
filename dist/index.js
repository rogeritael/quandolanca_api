"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./database/db");
const app = (0, express_1.default)();
//configs
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//variables
const PORT = process.env.PORT || 5000;
//routes
const UserRoutes = require("./routes/UserRoutes");
const ReleaseRoutes = require("./routes/ReleaseRoutes");
const UserListRoutes = require("./routes/UserListRoutes");
const NotificationRoutes = require("./routes/NotificationsRoutes");
app.use("/users", UserRoutes);
app.use("/releases", ReleaseRoutes);
app.use("/userlist", UserListRoutes);
app.use("/usernotifications", NotificationRoutes);
// {force: true}
db_1.db.sync().then(() => {
    app.listen(PORT);
}).catch((error) => console.log(error));
