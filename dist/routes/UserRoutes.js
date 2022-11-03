"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const verifyToken_1 = require("../middleware/verifyToken");
const Router = express_1.default.Router();
Router.post("/register", UserController_1.UserController.register);
Router.post("/login", UserController_1.UserController.login);
Router.get("/getuser", verifyToken_1.verifyToken, UserController_1.UserController.getUser);
module.exports = Router;
