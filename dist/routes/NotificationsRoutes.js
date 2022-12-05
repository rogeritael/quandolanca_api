"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NotificationsController_1 = require("../controllers/NotificationsController");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
// router.post('/create', verifyToken, NotificationsController.createNotification);
router.post('/create', verifyToken_1.verifyToken, NotificationsController_1.NotificationsController.generateNotifications);
router.get('/getnotifications', verifyToken_1.verifyToken, NotificationsController_1.NotificationsController.getNotifications);
router.put('/setAllAsRead', verifyToken_1.verifyToken, NotificationsController_1.NotificationsController.setNotificationsAsRead);
module.exports = router;
