const Course = require('../modals/course');
const fs = require('fs');
const path = require('path');



const addCourse = async (req, res) => {
    const { coursename, courseprice, courseduration, coursedecription, coursestatus } = req.body;
    const courseimage = req.file.filename;

    const newcourse = new Course({
        coursename,
        courseprice,
        courseduration,
        coursedecription,
        courseimage,
        coursestatus: coursestatus === 'true'
    });

    console.log(newcourse);

    try {
        const result = await newcourse.save();
        if (!result) {
            return res.status(404).json({ status: false, message: 'An error has occurred' });
        }
        res.status(200).json({ status: true, message: 'Added course successfully', data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const viewCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        const finalCourses = courses.map((course) => ({
            ...course._doc, courseimage:` ${req.protocol}://${req.get('host')}/uploads/${course.courseimage}`
        }));
        res.status(200).json({ message: 'Courses Found Successfully', data: finalCourses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const searchCourses = async (req, res) => {
    const searchKey = req.params.searchkey;
    const searchCriteria = [
        { coursename: { $regex: new RegExp(searchKey, "i") } },
        { coursedecription: { $regex: new RegExp(searchKey, "i") } },
        { courseduration: { $regex: new RegExp(searchKey, "i") } },
    ];

    if (!isNaN(parseFloat(searchKey)) && isFinite(searchKey)) {
        searchCriteria.push({ courseprice: searchKey });
    };

    const CourseStatuses = ['true', 'false'];
    if (CourseStatuses.includes(searchKey.toLowerCase())) {
        searchCriteria.push({ coursestatus: searchKey.toLowerCase() });
    };

    console.log(searchKey);

    try {
        const courses = await Course.find({ $or: searchCriteria });
        const finalCourses = courses.map(course => ({
            ...course._doc, courseimage: `${req.protocol}://${req.get('host')}/uploads/${course.courseimage}`
        }));
        console.log(finalCourses);
        res.status(200).json({ message: 'Courses Found Successfully', data: finalCourses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const viewCourseById = async (req, res) => {
    const id = req.params.id;
    try {
        let course = await Course.findById(id).lean();
        course = { ...course, courseimage:` ${req.protocol}://${req.get('host')}/uploads/${course.courseimage}` }
        if (!course) {
            return res.status(404).json({ message:` Course not found by this id: ${id}` });
        }
        res.status(200).json({ message: 'Course found successfully', data: course });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateCourse = async (req, res) => {
    const _id = req.params._id;
    const { coursename, courseprice, courseduration, coursedecription, coursestatus } = req.body;
    let courseimage;

    if (req.file) {
        courseimage = req.file.filename;

        try {
            const existingCourse = await Course.findById(_id);
            if (existingCourse.courseimage) {
                fs.unlinkSync(`uploads/${existingCourse.courseimage}`);
            }
        } catch (err) {
            console.log("Error deleting old image:", err);
            return res.status(400).json({ message: `Error deleting old image by this id: ${_id} `});
        }
    } else {
        const existingCourse = await Course.findById(_id);
        if (!existingCourse) {
            return res.status(400).json({ message:`Course not found by this id: ${_id} `});
        }
        courseimage = existingCourse.courseimage;
    }

    try {
        const CourseUpdated = await Course.updateOne({ _id }, {
            $set: {
                coursename, courseprice, courseduration, coursedecription, courseimage, coursestatus
            }
        });
        res.status(200).json({ message: 'Course updated successfully', data: CourseUpdated });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteCourse = async (req, res) => {
    const id = req.params.id;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: `Course not found by this id: ${id}` });
        }
        const tmp_path = path.join(__dirname, 'uploads', course.courseimage);
        if (fs.existsSync(tmp_path)) {
            fs.unlinkSync(tmp_path);
        }
        const result = await Course.deleteOne({ _id: id });
        res.status(200).json({ message: 'Course Deleted Successfully', data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server error' });
    }
};

const updateCourseStatus = async (req, res) => {
    const id = req.params.id;
    const newstatus = req.body.status;
    console.log(id, newstatus);
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: `Course not found by this id: ${id} `});
        }
        const updatedcourse_status = await Course.updateOne(
            { _id: id }, { $set: { coursestatus: newstatus } }
        );
        res.status(200).json({ message: 'Course Status updated successfully', data: updatedcourse_status });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server error' });
    }
};

const deleteMultipleCourses = async (req, res) => {
    const AllIds = req.body.ids;
    console.log(AllIds);
    try {
        const DeleteImage = await Course.find({ _id: { $in: AllIds } });
        DeleteImage.forEach(item => {
            const tmp_path = path.join(__dirname, 'uploads', item.courseimage);
            if (fs.existsSync(tmp_path)) {
                fs.unlinkSync(tmp_path);
            }
        });
        try {
            const DeleteCourse = await Course.deleteMany({ _id: { $in: AllIds } });
            res.status(200).json({ message: 'Course deleted successfully', data: DeleteCourse });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error in Deleting the course' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server error' });
    }
};

const viewCoursesByStatus = async (req, res) => {
    try {
        const courses = await Course.find({ coursestatus: true });
        res.status(200).json({ message: 'Course found whose status is Active', data: courses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addCourse,
    viewCourses,
    searchCourses,
    viewCourseById,
    updateCourse,
    deleteCourse,
    updateCourseStatus,
    deleteMultipleCourses,
    viewCoursesByStatus
};