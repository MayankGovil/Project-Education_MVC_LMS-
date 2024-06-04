const Slider = require('../modals/Slider');
const fs = require('fs');
const path = require('path');

const addSlider = async (req, res) => {
    try {
        const { slidername, slidersubheading, sliderdecription, slidertatus } = req.body;
        const sliderimage = req.file.filename;

        const newSlider = new Slider({
            slidername, slidersubheading, sliderdecription, slidertatus, sliderimage
        });

        const result = await newSlider.save();
        if (!result) {
            return res.status(404).json({ status: false, message: 'An error has occurred' });
        }
        res.status(200).json({ status: true, message: 'Slider added successfully', data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const viewSliders = async (req, res) => {
    try {
        const slides = await Slider.find();
        const finalSlides = slides.map((slide) => ({
            ...slide._doc, sliderimage: `${req.protocol}://${req.get('host')}/Sliders/${slide.sliderimage}`
        }));
        res.status(200).json({ message: 'Slides found successfully', data: finalSlides });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const viewSlidersByStatus = async (req, res) => {
    try {
        const sliders = await Slider.find({ slidertatus: true });
        const finalSlides = sliders.map((slide) => ({
            ...slide._doc, sliderimage: `${req.protocol}://${req.get('host')}/Sliders/${slide.sliderimage}`
        }));
        res.status(200).json({ message: 'Sliders found whose status are active', data: finalSlides });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const searchSlider = async (req, res) => {
    let searchKey = req.params.searchKey;
    let searchCriteria = [
        { slidername: { $regex: new RegExp(searchKey, 'i') } },
        { slidersubheading: { $regex: new RegExp(searchKey, 'i') } },
        { sliderdecription: { $regex: new RegExp(searchKey, 'i') } },
    ];

    let Sliderstatus = ['true', 'false'];
    if (Sliderstatus.includes(searchKey.toLowerCase())) {
        searchCriteria.push({ slidertatus: searchKey.toLowerCase() });
    }
    try {
        const slides = await Slider.find({ $or: searchCriteria });
        const finalSlides = slides.map((slide) => ({
            ...slide._doc, sliderimage: `${req.protocol}://${req.get('host')}/Sliders/${slide.sliderimage}`
        }));
        res.status(200).json({ message: 'Slides found successfully', data: finalSlides });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getSlideById = async (req, res) => {
    let id = req.params.id;
    try {
        let slide = await Slider.findById(id).lean();
        slide = { ...slide, sliderimage: `${req.protocol}://${req.get('host')}/Sliders/${slide.sliderimage}` }
        if (!slide) {
            return res.status(404).json({ message: `Slider not found by this id: ${id}` });
        }
        res.status(200).json({ message: 'Slider found successfully', data: slide });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateSlider = async (req, res) => {
    const _id = req.params._id;
    const { slidername, slidersubheading, sliderdecription, slidertatus } = req.body;
    let sliderimage;
    try {
        if (req.file) {
            sliderimage = req.file.filename;
            const existingSlider = await Slider.findById(_id);
            if (!existingSlider) {
                return res.status(404).json({ message: `Slide not found by this id: ${_id}` });
            }
            try {
                fs.unlinkSync(`Sliders/${existingSlider.sliderimage}`);
            } catch (err) {
                console.log(`Error in deleting old image: ${err}`);
            }
        } else {
            const existingSlider = await Slider.findById(_id);
            if (!existingSlider) {
                return res.status(400).json({ message: `Slide not found by this id: ${_id}` });
            }
            sliderimage = existingSlider.sliderimage;
        }

        const sliderUpdated = await Slider.updateOne({ _id }, {
            $set: { slidername, slidersubheading, sliderdecription, slidertatus, sliderimage }
        });
        res.status(200).json({ message: 'Slider updated successfully', data: sliderUpdated });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateSliderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const newStatus = req.body.status;
        const slider = await Slider.findById(id);
        if (!slider) {
            return res.status(404).json({ message: `Slider not found by this id: ${id}` });
        }
        const updatedSliderStatus = await Slider.updateOne(
            { _id: id }, { $set: { slidertatus: newStatus } }
        );
        res.status(200).json({ message: 'Slider status updated successfully', data: updatedSliderStatus });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteSlider = async (req, res) => {
    try {
        const id = req.params.id;
        const slide = await Slider.findById(id);
        if (!slide) {
            return res.status(404).json({ message: `Slider not found by this id: ${id}` });
        }
        const tmp_path = path.join(__dirname, '../Sliders', slide.sliderimage);
        if (fs.existsSync(tmp_path)) {
            fs.unlinkSync(tmp_path);
        }
        const result = await Slider.deleteOne({ _id: id });
        res.status(200).json({ message: 'Slider deleted successfully', data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteMultipleSliders = async (req, res) => {
    try {
        const allIds = req.body.ids;
        const deleteImage = await Slider.find({ _id: { $in: allIds } });
        deleteImage.forEach((slide) => {
            const tmp_path = path.join(__dirname, '../Sliders', slide.sliderimage);
            if (fs.existsSync(tmp_path)) {
                fs.unlinkSync(tmp_path);
            }
        });
        const deleteSliders = await Slider.deleteMany({ _id: { $in: allIds } });
        res.status(200).json({ message: 'Sliders deleted successfully', data: deleteSliders });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addSlider,
    viewSliders,
    viewSlidersByStatus,
    searchSlider,
    getSlideById,
    updateSlider,
    updateSliderStatus,
    deleteSlider,
    deleteMultipleSliders
};

