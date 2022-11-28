import express from 'express';
import { NotificationsController } from '../controllers/NotificationsController';
import { verifyToken } from '../middleware/verifyToken';
const router = express.Router();

// router.post('/create', verifyToken, NotificationsController.createNotification);
router.post('/create', verifyToken, NotificationsController.generateNotifications);
router.get('/getnotifications', verifyToken, NotificationsController.getNotifications);
router.put('/setAllAsRead', verifyToken, NotificationsController.setNotificationsAsRead);


module.exports = router;