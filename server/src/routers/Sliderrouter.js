const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const sliderController = require('../controllers/Slidercontroller');

const sliderstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Sliders/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage:sliderstorage }).single('image');

// router.use('/Sliders',express.static(path.join(__dirname,'Sliders')))

router.post('/addslider', upload , sliderController.addSlider);
router.get('/viewslider', sliderController.viewSliders);
router.get('/viewsliderbystatus', sliderController.viewSlidersByStatus);
router.get('/searchSlider/:searchKey', sliderController.searchSlider);
router.get('/getSlide_byid/:id', sliderController.getSlideById);
router.put('/updateSlider/:_id', upload , sliderController.updateSlider);
router.put('/updateSliderStatus/:id', sliderController.updateSliderStatus);
router.delete('/deleteSlider/:id', sliderController.deleteSlider);
router.delete('/multipleSliderDelete', sliderController.deleteMultipleSliders);

module.exports = router;
