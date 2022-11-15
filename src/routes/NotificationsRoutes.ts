import express from 'express';
import { NotificationsController } from '../controllers/NotificationsController';
import { verifyToken } from '../middleware/verifyToken';
const router = express.Router();

router.post('/create', verifyToken, NotificationsController.createNotification);


module.exports = router;