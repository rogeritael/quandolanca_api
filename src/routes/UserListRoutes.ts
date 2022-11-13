import express from "express";
import { UserListController } from "../controllers/UserListController";
import { verifyToken } from "../middleware/verifyToken";
const router = express.Router();

router.post('/add/:releaseid', verifyToken, UserListController.addItemToList);
router.get('/userlist', verifyToken, UserListController.getList);
router.delete('/remove/:id', verifyToken, UserListController.removeFromList);

module.exports = router;