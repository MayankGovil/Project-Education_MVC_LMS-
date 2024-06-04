const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const videoController = require('../controllers/Videocontroller');

router.post('/AddVideo', upload.none(), videoController.addVideo);
router.get('/viewVideos', videoController.viewVideos);
router.get('/searchVideos/:searchKey', videoController.searchVideos);
router.get('/searchVideosByCategory/:id', videoController.searchVideosByCategory);
router.get('/getVideoBy_id/:id', videoController.getVideoById);
router.put('/updateVideo_status/:id', videoController.updateVideoStatus);
router.put('/UpdateVideo/:id', upload.none(), videoController.updateVideo);
router.delete('/DeleteVideo/:id', videoController.deleteVideo);
router.delete('/multiple_videosDelete', videoController.deleteMultipleVideos);

module.exports = router;