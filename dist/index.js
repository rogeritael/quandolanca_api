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
const port = process.env.PORT || 3000;
//configs
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routes
const UserRoutes = require("./routes/UserRoutes");
app.use("/users", UserRoutes);
db_1.db.sync().then(() => {
    app.listen(port);
}).catch((error) => console.log(error));
