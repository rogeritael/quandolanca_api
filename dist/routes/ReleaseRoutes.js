"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReleaseController_1 = require("../controllers/ReleaseController");
const imageupload_1 = require("../middleware/imageupload");
const router = express_1.default.Router();
router.post('/create', imageupload_1.imageUpload.single("image"), ReleaseController_1.ReleaseController.create);
router.get('/getcategory/:category', ReleaseController_1.ReleaseController.getReleaseByCategory);
router.get('/nextreleases', ReleaseController_1.ReleaseController.getNextReleases);
router.get('/recently', ReleaseController_1.ReleaseController.getRecentlyReleased);
router.get('/search/:term', ReleaseController_1.ReleaseController.searchReleaseByName);
module.exports = router;
