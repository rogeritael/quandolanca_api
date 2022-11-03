import express from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken } from '../middleware/verifyToken';

const Router = express.Router();

Router.post("/register", UserController.register);
Router.post("/login", UserController.login);
Router.get("/getuser", verifyToken, UserController.getUser);

module.exports = Router;