const Video = require('../modals/Video');
const Course = require('../modals/course');

const addVideo = async (req, res) => {
    const { coursecategory, videotopic, videourl, videostatus } = req.body;

    try {
        const newVideo = new Video({ coursecategory, videotopic, videourl, videostatus: videostatus === 'true' });
        const result = await newVideo.save();
        res.status(200).json({ status: true, message: 'Video added successfully', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const viewVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('coursecategory');
        res.status(200).json({ message: "Videos found successfully", data: videos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const searchVideos = async (req, res) => {
    const searchKey = req.params.searchKey;

    try {
        const courses = await Course.find({ coursename: { $regex: new RegExp(searchKey, "i") } });
        const courseIds = courses.map(course => course._id);
        const searchCriteria = [
            { coursecategory: { $in: courseIds } },
            { videotopic: { $regex: new RegExp(searchKey, 'i') } }
        ];

        if (['true', 'false'].includes(searchKey.toLowerCase())) {
            searchCriteria.push({ videostatus: searchKey.toLowerCase() === 'true' });
        }

        const videos = await Video.find({ $or: searchCriteria }).populate('coursecategory');
        res.status(200).json({ message: 'Videos found successfully', data: videos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const searchVideosByCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const videos = await Video.find({ coursecategory: categoryId }).populate('coursecategory');
        res.status(200).json({ message: 'Videos found successfully', data: videos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getVideoById = async (req, res) => {
    const id = req.params.id;

    try {
        const videoData = await Video.findById(id).populate('coursecategory');
        if (!videoData) {
            return res.status(404).json({ message:` Video not found by this id: ${id} `});
        }
        res.status(200).json({ message: 'Video found successfully', data: videoData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateVideoStatus = async (req, res) => {
    const id = req.params.id;
    const newStatus = req.body.status;

    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message:` Video not found by this id: ${id}` });
        }

        const updatedVideoStatus = await Video.updateOne({ _id: id }, { $set: { videostatus: newStatus } });
        res.status(200).json({ message: 'Video status updated successfully', data: updatedVideoStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateVideo = async (req, res) => {
    const id = req.params.id;
    const { coursecategory, videotopic, videourl, videostatus } = req.body;

    try {
        const updatedVideo = await Video.updateOne({ _id: id }, { $set: { coursecategory, videotopic, videourl, videostatus } });
        res.status(200).json({ message: 'Video updated successfully', data: updatedVideo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteVideo = async (req, res) => {
    const id = req.params.id;

    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: `Video not found by this id: ${id} `});
        }

        const result = await Video.deleteOne({ _id: id });
        res.status(200).json({ message: 'Video deleted successfully', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteMultipleVideos = async (req, res) => {
    const allIds = req.body.ids;

    try {
        const result = await Video.deleteMany({ _id: { $in: allIds } });
        res.status(200).json({ message: 'Videos deleted successfully', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addVideo,
    viewVideos,
    searchVideos,
    searchVideosByCategory,
    getVideoById,
    updateVideoStatus,
    updateVideo,
    deleteVideo,
    deleteMultipleVideos
};