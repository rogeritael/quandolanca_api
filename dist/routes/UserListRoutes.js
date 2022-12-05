"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserListController_1 = require("../controllers/UserListController");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.post('/add/:releaseid', verifyToken_1.verifyToken, UserListController_1.UserListController.addItemToList);
router.get('/userlist', verifyToken_1.verifyToken, UserListController_1.UserListController.getList);
router.delete('/remove/:id', verifyToken_1.verifyToken, UserListController_1.UserListController.removeFromList);
module.exports = router;
