import express from "express";
import { ReleaseController } from "../controllers/ReleaseController";
const router = express.Router();

router.post('/create', ReleaseController.create);
router.get('/getcategory/:category', ReleaseController.getReleaseByCategory);
router.get('/nextreleases', ReleaseController.getNextReleases);
router.get('/recently', ReleaseController.getRecentlyReleased);



module.exports = router;