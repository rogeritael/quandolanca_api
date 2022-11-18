import express from "express";
import { ReleaseController } from "../controllers/ReleaseController";
import { imageUpload } from "../middleware/imageupload";
const router = express.Router();

router.post('/create', imageUpload.single("image"), ReleaseController.create);
router.get('/getcategory/:category', ReleaseController.getReleaseByCategory);
router.get('/nextreleases', ReleaseController.getNextReleases);
router.get('/recently', ReleaseController.getRecentlyReleased);
router.get('/search/:term', ReleaseController.searchReleaseByName);



module.exports = router;