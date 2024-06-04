const express = require('express');
const router = express.Router();
const multer = require('multer');
// const path = require('path');



const {
    addCourse,
    viewCourses,
    searchCourses,
    viewCourseById,
    updateCourse,
    deleteCourse,
    updateCourseStatus,
    deleteMultipleCourses,
    viewCoursesByStatus
} = require('../controllers/coursecontroller');



const storage_courseimg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});




const upload = multer({ storage: storage_courseimg }).single('image');


// router.use('/uploads', express.static(path.join(__dirname, 'uploads')));



router.post('/addcourse', upload, addCourse);
router.get('/viewcourses', viewCourses);
router.get('/searchcourses/:searchkey', searchCourses);
router.get('/coursebyid/:id', viewCourseById);
router.put('/updatecourse/:_id', upload, updateCourse);
router.delete('/deletecourse/:id', deleteCourse);
router.put('/updatecourse_status/:id', updateCourseStatus);
router.delete('/multiple_coursesdelete', deleteMultipleCourses);
router.get('/viewcoursebystatus', viewCoursesByStatus);

module.exports = router;